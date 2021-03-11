interface ActionButtonProps {
  actionFn: React.MouseEventHandler<HTMLButtonElement>;
  icon: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ actionFn, icon }) => {
  return (
    <button className='button is-primary is-small' onClick={actionFn}>
      <span className='icon'>
        <i className={icon}></i>
      </span>
    </button>
  );
};

export default ActionButton;
