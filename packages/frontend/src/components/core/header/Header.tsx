import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import style from './Header.module.scss';
const Header = () => {
    return <div>
        <div className={style.container}>
            <img className={style.logo} src="/full_logo.png" />
            <div className={style.buttons}>
                <Button size="small" text label='Connections' />
                <Button size="small" text label='SignIn' />
            </div>
        </div>
        <Divider className={style.divider}></Divider>
    </div>
}

export default Header;