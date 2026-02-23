
export const APP_NAME = "UniPost";
export const BRAND_COLOR = "#006aff";
export const LOGO_URL = "https://i.imgur.com/nkzfcy5.png";

export const NAV_LINKS = [
  { name: "Recursos", href: "#features" },
  { name: "Como Funciona", href: "#how-it-works" },
  { name: "Preços", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

export const PRICING_PLANS = [
  {
    name: "Iniciante",
    monthlyPrice: "29,90",
    annualPrice: "16,45",
    annualTotal: "197,40",
    description: "Perfeito para quem está começando agora.",
    features: ["Até 3 Perfis Conectados", "Posts Agendados Ilimitados", "Análises Básicas", "1 Usuário"],
    cta: "Assinar Iniciante",
    popular: false,
    stripeProductIdMonthly: "prod_TrNRaeh99KrweZ",
    stripeProductIdAnnual: "prod_TrNU2E0tJBmiu8",
    stripeLinkMonthly: "https://buy.stripe.com/28E28j13Mc5f6kh9O4g7e00?success=true",
    stripeLinkAnnual: "https://buy.stripe.com/9B600bbIqc5fgYVbWcg7e03?success=true"
  },
  {
    name: "Pro",
    monthlyPrice: "49,90",
    annualPrice: "27,45",
    annualTotal: "329,40",
    description: "Para criadores e pequenas empresas em crescimento.",
    features: ["Até 25 Perfis Conectados", "Posts Agendados Ilimitados", "Análises Avançadas", "Gerador de Legendas por IA", "Suporte Prioritário"],
    cta: "Assinar Pro",
    popular: true,
    stripeProductIdMonthly: "prod_TrNRMP9loWuxdy",
    stripeProductIdAnnual: "prod_TrNVHLPXcNlQo2",
    stripeLinkMonthly: "https://buy.stripe.com/7sYeV53bUc5fdMJ5xOg7e01?success=true",
    stripeLinkAnnual: "https://buy.stripe.com/9B614f5k2fhr9wt6BSg7e04?success=true"
  },
  {
    name: "Agência",
    monthlyPrice: "119,90",
    annualPrice: "65,95",
    annualTotal: "791,40",
    description: "Gerenciar múltiplas marcas ficou fácil.",
    features: ["Perfis Conectados Ilimitados", "10 Membros na Equipe", "Fluxos de Aprovação de Clientes", "Relatórios White-label", "Gerente de Conta Dedicado"],
    cta: "Assinar Agência",
    popular: false,
    stripeProductIdMonthly: "prod_TrNStlWe8Fsw59",
    stripeProductIdAnnual: "prod_TrNXqvtZo3AjBM",
    stripeLinkMonthly: "https://buy.stripe.com/fZueV55k28T30ZXaS8g7e02?success=true",
    stripeLinkAnnual: "https://buy.stripe.com/28E00b6o67OZ5gd0dug7e05?success=true"
  }
];
