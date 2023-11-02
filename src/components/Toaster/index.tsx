import { Toaster as RadToaster } from "sonner";

export function Toaster() {
  return (
    <RadToaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "hsl(20 14.3% 4.1%)",
          color: "hsl(0 0% 95%)",
          border: "1px solid hsl(240 3.7% 15.9%)",
        },
      }}
    />
  );
}
