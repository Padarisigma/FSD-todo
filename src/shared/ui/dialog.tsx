interface DialogProps {
	state: boolean;
	children: React.ReactNode;
 }
 
 export default function Dialog({ state, children }: DialogProps) {
	if (!state) return null; // Don't render if state is false
 
	return (
	  <div className="modal-overlay">
		 <div className="modal-box">
			{children}
		 </div>
	  </div>
	);
 }