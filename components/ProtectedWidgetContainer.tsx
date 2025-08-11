import ShadowDOM from "react-shadow";

export default function ProtectedWidget({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ShadowDOM.div className="font-black">
      {/* Your entire widget markup and styles here */}
      {children}
      <style>{`
        /* Your styles here scoped inside shadow DOM */
        :host {
        color: #eee;
        font-size:1.5rem;
        }
      `}</style>
    </ShadowDOM.div>
  );
}
