import { AlertTemplateProps } from 'react-alert';

const AlertTemplate: React.ComponentType<AlertTemplateProps> = ({
  style,
  options,
  message,
  close,
}) => (
  <div
    style={{
      ...style,
      backgroundColor: 'white',
      color: 'black',
      padding: '10px',
      borderRadius: '5px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '300px',
      height: '100px',
    }}
  >
    <div>{message?.toString()}</div>
    <button
      onClick={close}
      style={{
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '5px',
        cursor: 'pointer',
      }}
    >
      X
    </button>
  </div>
);

export default AlertTemplate;
