// define el componente `LandingTrust` que lista garantías y beneficios en la página de inicio.
import { TRUST_ITEMS } from "@/constants";

const trustItems = TRUST_ITEMS;

export function LandingTrust() {
  return (
    <section className="border-t-2 border-b-2 border-primary py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {trustItems.map((item) => (
          <div key={item.title} className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 flex items-center justify-center border border-primary rounded-full group-hover:bg-primary group-hover:text-bg transition-colors text-primary">
              <span className="material-symbols-outlined">{item.icon}</span>
            </div>
            <h5 className="text-primary font-bold text-sm tracking-wider">{item.title}</h5>
            <p className="text-primary/60 text-xs max-w-[200px]">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
