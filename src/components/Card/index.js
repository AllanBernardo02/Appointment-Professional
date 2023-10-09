import classNames from "../../classNames";

const defaultProps = {
    background: "white",
    // padding: "2",
};

function Card({className, background, children, ...props}) {
    const classes = classNames(
        className,
        "shadow-sm rounded",
        `bg-${background}`
    );
    return (
        <div className={classes} {...props}>
            <div className=" px-m-5 py-m-4 ">{children}</div>
        </div>
    );
}

Card.defaultProps = defaultProps;
export default Card;
