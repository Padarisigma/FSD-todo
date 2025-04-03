import { ReactNode } from "react";

export function Table({className, children}: { className:string; children: ReactNode}){
	return <table className={className}>
		{children}
	</table>
}

export function TableRow({className,children} : {className:string; children: ReactNode}){
	return <tr  className={className}>
		{children}
	</tr>
}
export function TableCell({className,children} : {className:string; children: ReactNode}){
	return <td  className={className}>
		{children}
	</td>
}

// export function TableCell({children}: { children: ReactNode}){
// 	return <td>
// 		{children}
// 	</td>
// }