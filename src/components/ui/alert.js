const Alert = ({color, msg}) => {
    return (<div
        style={{
            backgroundColor: color,
            padding: 20,
            marginBottom: 20,
            borderRadius: 5,
            width: '58%',
        }}
    >
        {msg}
    </div>);
};

export default Alert;