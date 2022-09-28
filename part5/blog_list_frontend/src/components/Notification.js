const Notification = ({ message, className }) => {
    return (
        <div className={className}>
            <em>{message}</em>
        </div>
    )
}
export default Notification