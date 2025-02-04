export default function get_p_final(p_init: number, t_init: number, t_final: number) {
  // *1 car bug il me le prend pas comme un nombre (1 fois sur 2)
  const first = p_init * (t_final * 1 + 273.15);
  return Math.round((first / (t_init * 1 + 273.15)) * 1000) / 1000;
}
