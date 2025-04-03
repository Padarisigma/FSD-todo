import { cva } from "class-variance-authority"

const  button = cva(["flex", "justify-center", 'items-center' ], {
  variants:{
    color: {
      primary: "bg-blue-500",
      secondary: "bg-blue-800",
      theme:"bg-transparent border-[1px] border-blue-800 rounded-md"
    },
    size: {
      small: 'p-[5px]',
      medium: 'p-[10px]',
      large: 'p-[15px]'
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'medium'
  }
})

interface IButton {
  color:"primary" | "secondary" | "theme"
  size: "small" | "medium" | "large"
  children: React.ReactNode
  sx: string;
  onClick: () => void
}

export default function Button({color='primary', size="medium", children="button", sx="",onClick}:IButton){
    return <button className={`${button({color, size})} ${sx}`} onClick={onClick}>
      {children}
    </button>
}