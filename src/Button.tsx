type ButtonPropsType = {
    title: string
    onClick?: () => void
    //createTaskHandler?: () =>void
    disabled?: boolean
    className?: string;
  }                                          
  export const Button = ({ title, onClick, disabled, className }: ButtonPropsType) => {
    return (
      
    <button disabled ={disabled}
    onClick={onClick}
    className={className}
    >{title}</button>
    )
  }