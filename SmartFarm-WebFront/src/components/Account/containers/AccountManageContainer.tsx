import {useEffect, useState} from "react";
import AccountManage from "../components/AccountManage";
import {useNavigate, useSearchParams} from "react-router-dom";
import useLocalStorage from "@hooks/useLocalStorage";
import {requestSecureGet, requestSecurePost, requestSecurePut,} from "@lib/api";
import {AccountManageTypes, AccountTypes} from "@typedef/components/Site/account.types";


const AccountManageContainer = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const {getToken} = useLocalStorage();
    const [type, setType] = useState<"등록하기" | "상세보기">("등록하기");
    const [inputs, setInputs] = useState<AccountManageTypes>({
        username: "",
        address: "",
        email: "",
        name: "",
        password: "",
        phone: "",
        role: "ROLE_USER",

        // site
        siteSeq: undefined,
        siteCrop: "",
        siteLocation: "",
        siteName: "",
        siteApiKey: "",
        siteDelay: 60,
    });
    const [msgs, setMsgs] = useState<{ username: string; siteSeq: string }>({
        username: "",
        siteSeq: "",
    });

    const onChangeInputs = (e: { target: HTMLInputElement }) => {
        const {name, value} = e.target;

        // 전화번호 숫자만 입력
        if (name === "phone") {
            if (!/^[0-9\b]+$/.test(value)) {
                return;
            }
        }
        if (name === "siteDelay")
            setInputs((prev) => ({
                ...prev,
                siteDelay: parseInt(value),
            }));
        else
            setInputs((prev) => ({
                ...prev,
                [name]: value,
            }));
    };

    const onChangeMsgs = (input: "username" | "siteSeq", msg: string) => {
        setMsgs((prev) => ({
            ...prev,
            [input]: msg,
        }));
    };

    // 아이디 중복확인
    const validationUsername = async () => {
        const {config, data} = await requestSecureGet<boolean>(
            `/admin/users/exist/${inputs.username}`,
            {},
            getToken()!
        );

        if (config.status >= 200 && config.status < 400) {
            // data : true (존재함) | false (존재하지않음)
            if (data) {
                onChangeMsgs("username", "이미 존재하는 아이디입니다.");
            } else {
                onChangeMsgs("username", "");
            }
        }
    };

    // 농가번호 중복확인
    const validationSiteSeq = async () => {
        if (!inputs.siteSeq) return;
        const {config, data} = await requestSecureGet<boolean>(
            `/admin/sites/exist/${inputs.siteSeq}`,
            {},
            getToken()!
        );

        if (config.status >= 200 && config.status < 400) {
            // data : true (존재함) | false (존재하지않음)
            if (data) {
                onChangeMsgs("siteSeq", "이미 존재하는 농가번호입니다.");
            } else {
                onChangeMsgs("siteSeq", "");
            }
        }
    };

    const onClickClearUsername = () => {
        setInputs((prev) => ({
            ...prev,
            username: "",
        }));
        onChangeMsgs("username", "");
    };

    const onClickClearSiteSeq = () => {
        setInputs((prev) => ({
            ...prev,
            siteSeq: undefined,
        }));
        onChangeMsgs("siteSeq", "");
    };

    const onClickRole = (selected: "ADMIN" | "USER") => {
        setInputs((prev) => ({
            ...prev,
            role: `ROLE_${selected}`,
        }));
    };

    // inputs 유효성 검사
    const validationInputs = () => {
        let message: null | string = null;
        if (!inputs.name) message = "관리자명을";
        else if (!inputs.siteLocation) message = "지역을";
        else if (!inputs.siteCrop) message = "작물을";
        else if (!inputs.username) message = "아이디를";
        else if (msgs.username) message = "올바른 아이디를";
        else if (msgs.siteSeq) message = "올바른 아이디를";
        else if (type === "등록하기" && !inputs.password) message = "비밀번호를";
        else if (!inputs.siteName) message = "농가명을";
        else if (
            inputs.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email)
        )
            message = "올바른 이메일 형식으로";
        else if (!inputs.siteDelay) message = "수신 주기(단위: 초, 최소: 60)를"
        else if (inputs.siteDelay < 60) message = "수신 주기는 최소 60초로"

        return message;
    };

    const insert = async () => {
        const message = validationInputs();

        if (message) {
            alert(`${message} 입력해 주세요.`);
            return;
        }

        const {config} = await requestSecurePost(
            "/admin/user",
            {},
            inputs,
            getToken()!
        );

        if (config.status >= 200 && config.status < 400) {
            alert("성공적으로 등록이 완료되었습니다.");
            navigate("/account");
        }
    };

    const update = async () => {
        const message = validationInputs();

        if (message) {
            alert(`${message} 입력해 주세요.`);
            return;
        }

        const {config} = await requestSecurePut(
            "/admin/user",
            {},
            inputs,
            getToken()!
        );

        if (config.status >= 200 && config.status < 400) {
            alert("성공적으로 수정이 완료되었습니다.");
            navigate("/account");
        }
    };

    const getDataByAccountId = async (username: string) => {
        const {config, data} = await requestSecureGet<AccountTypes>(
            `/admin/users/${username}`,
            {},
            getToken()!
        );

        if (config.status >= 200 && config.status < 400) {
            setInputs({
                // USER
                username: data.username,
                password: "",
                address: data.address,
                email: data.email,
                name: data.name,
                phone: data.phone,
                role: data.role,

                // SITE
                siteSeq: data.site?.id,
                siteName: data.site?.name,
                siteCrop: data.site?.crop,
                siteLocation: data.site?.location,
                siteApiKey: data.site?.apiKey,
                siteDelay: data.site?.delay,
            });
        }
    };

    useEffect(() => {
        const username = searchParams.get("username");

        if (username) {
            setType("상세보기");
            getDataByAccountId(username);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AccountManage
            {...{
                type,
                inputs,
                onChangeInputs,
                validationUsername,
                validationSiteSeq,
                onClickClearUsername,
                onClickClearSiteSeq,
                onClickRole,
                msgs,
                insert,
                update,
            }}
        />
    );
};

export default AccountManageContainer;
