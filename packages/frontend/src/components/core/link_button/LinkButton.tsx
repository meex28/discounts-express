import { Link } from "@tanstack/react-router";
import { Button, ButtonProps } from "primereact/button";
import { ValidRoutes } from "../../../utils/routing";

interface LinkButtonProps extends ButtonProps {
    to: ValidRoutes;
}

const LinkButton = (props: LinkButtonProps) => {
    const { to, ...buttonProps } = props;

    return (
        <Link to={to}>
            <Button {...buttonProps} />
        </Link>
    )
}

export default LinkButton;