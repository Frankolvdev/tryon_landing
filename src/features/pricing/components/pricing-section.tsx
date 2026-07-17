import { getPublicSubscriptionPlans } from "@/features/pricing/api";
import type { SubscriptionPlan } from "@/features/pricing/types";
import styles from "./pricing-section.module.css";

function intervalLabel(interval: string): string {
  const labels: Record<string, string> = {
    day: "día",
    week: "semana",
    month: "mes",
    year: "año",
  };
  return labels[interval.toLowerCase()] ?? interval;
}

function formatPrice(plan: SubscriptionPlan): string {
  const amount = Number(plan.price_amount);
  if (!Number.isFinite(amount)) return String(plan.price_amount);

  try {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: plan.currency,
      maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount);
  } catch {
    return `${amount.toLocaleString("es-MX")} ${plan.currency}`;
  }
}

function isHighlighted(plan: SubscriptionPlan): boolean {
  return plan.metadata?.featured === true || plan.metadata?.popular === true;
}

function PricingCard({ plan }: { plan: SubscriptionPlan }) {
  const highlighted = isHighlighted(plan);

  return (
    <article className={`${styles.card} ${highlighted ? styles.highlighted : ""}`}>
      {highlighted ? <span className={styles.popular}>Más popular</span> : null}
      <div className={styles.cardHeader}>
        <span className={styles.planKey}>{plan.key}</span>
        <h3>{plan.name}</h3>
        {plan.description ? <p>{plan.description}</p> : null}
      </div>

      <div className={styles.priceRow}>
        <strong>{formatPrice(plan)}</strong>
        <span>/ {intervalLabel(plan.billing_interval)}</span>
      </div>

      <div className={styles.allowances}>
        <div>
          <strong>{plan.tokens_per_period.toLocaleString("es-MX")}</strong>
          <span>tokens por periodo</span>
        </div>
        {plan.max_generations_per_period ? (
          <div>
            <strong>{plan.max_generations_per_period.toLocaleString("es-MX")}</strong>
            <span>generaciones máximas</span>
          </div>
        ) : null}
      </div>

      <ul className={styles.features}>
        {plan.features.map((feature) => (
          <li key={feature}>
            <span aria-hidden="true">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <a className={styles.cta} href="#register" data-plan-key={plan.key}>
        Elegir {plan.name}
        <span aria-hidden="true">→</span>
      </a>

      {!plan.stripe_configured ? (
        <p className={styles.availability}>Disponible próximamente para contratación.</p>
      ) : null}
    </article>
  );
}

export async function PricingSection() {
  let plans: SubscriptionPlan[] = [];
  let unavailable = false;

  try {
    plans = await getPublicSubscriptionPlans();
  } catch {
    unavailable = true;
  }

  return (
    <section className={styles.section} id="pricing" aria-labelledby="pricing-title">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <header className={styles.heading}>
          <span>PLANES DINÁMICOS</span>
          <h2 id="pricing-title">Elige el plan que se adapta a tu creatividad.</h2>
          <p>
            Esta información se obtiene directamente del backend. Los cambios de
            planes, precios, tokens y beneficios realizados desde el BackOffice se
            reflejan aquí sin modificar la landing.
          </p>
        </header>

        {unavailable ? (
          <div className={styles.state} role="status">
            <strong>No pudimos cargar los planes en este momento.</strong>
            <span>Verifica que el backend esté disponible e inténtalo nuevamente.</span>
          </div>
        ) : plans.length === 0 ? (
          <div className={styles.state} role="status">
            <strong>Aún no hay planes públicos disponibles.</strong>
            <span>Activa al menos un plan público desde el BackOffice.</span>
          </div>
        ) : (
          <div className={styles.grid}>
            {plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        )}

        <p className={styles.note}>
          Los botones conservan el plan seleccionado. El checkout autenticado se
          conectará en el módulo de facturación correspondiente.
        </p>
      </div>
    </section>
  );
}
