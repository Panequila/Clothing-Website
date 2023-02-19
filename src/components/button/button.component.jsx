import './button.styles.scss'
/* we have 3 buttons in our app
default
inverted
google sign in
*/

const BUTTON_TYPE = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({children, buttonType, ...otherProps}) => {
    return(
        <button className={`button-container ${BUTTON_TYPE[buttonType]}`} {...otherProps}>{children}</button>
    )
}

export default Button;