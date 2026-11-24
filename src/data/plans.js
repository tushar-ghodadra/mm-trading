/* Research plans shown in the Plans section. seg: "equity" | "derivatives". */
const plans = [
  { seg: "equity", tier: "Core", name: "Cash Core", desc: "Intraday and short-swing ideas in liquid cash-segment stocks.",
    points: ["Liquid, widely traded stocks", "Entry, target and stop-loss", "Follow-ups through the session"] },
  { seg: "equity", tier: "Elite", name: "Cash Elite", desc: "Fewer, higher-conviction equity calls with closer analyst support.",
    points: ["Selective, higher-conviction setups", "Priority follow-ups and exits", "Direct line to the desk"] },
  { seg: "equity", tier: "Horizon", name: "BTST · Swing · Positional", desc: "For traders who cannot watch the screen all day.",
    points: ["Buy-today-sell-tomorrow ideas", "Swing trades over days to weeks", "Positional picks with a thesis"] },
  { seg: "derivatives", tier: "Core", name: "Stock Futures Core", desc: "Directional stock-futures calls with defined risk per lot.",
    points: ["Trend and momentum setups", "Risk stated per lot", "Trailing stop-loss updates"] },
  { seg: "derivatives", tier: "Elite", name: "Stock Futures Elite", desc: "Selective futures setups backed by deeper sector research.",
    points: ["Sector and stock-level research", "Fewer, sharper calls", "Priority analyst support"] },
  { seg: "derivatives", tier: "Core", name: "Stock Options Core", desc: "Option-buying ideas in liquid stock contracts.",
    points: ["Liquid strikes only", "Premium-based levels", "Exit guidance before expiry"] },
  { seg: "derivatives", tier: "Elite", name: "Stock Options Elite", desc: "High-conviction stock option calls with tighter risk control.",
    points: ["Selective setups", "Strike selection rationale", "Priority follow-ups"] },
  { seg: "derivatives", tier: "Core", name: "Index Options Core", desc: "Nifty and Bank Nifty option ideas for active intraday traders.",
    points: ["Index-focused intraday calls", "Clear premium levels", "Expiry-day awareness"] },
  { seg: "derivatives", tier: "Elite", name: "Index F&O Elite", desc: "Index futures and options with closer desk support.",
    points: ["Index futures and options", "Hedging context where relevant", "Direct line to the desk"] }
];

export default plans;
