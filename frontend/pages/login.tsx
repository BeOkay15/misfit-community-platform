import { FC } from "react";

interface LoginProps {
    title: string;
}

const Login: FC<LoginProps> = ({ title }) => {
    return <h1>{title}</h1>;
};

export default Login;
