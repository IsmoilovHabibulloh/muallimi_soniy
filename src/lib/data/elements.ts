import type { Element, ElementType } from "./types";

// Compact element builder: [id, type, arabic, uzbek, audioUrl, start, end, x, y, w, h]
type ED = [string, ElementType, string, string, string | null, number, number, number, number, number, number];

function make(pg: number, data: ED[]): Element[] {
  return data.map(([id, type, arabic, uzbek, audioUrl, start, end, x, y, w, h]) => ({
    id: `p${pg}_${id}`,
    type,
    arabic,
    uzbek,
    ...(audioUrl ? { audioUrl } : {}),
    start,
    end,
    x,
    y,
    width: w,
    height: h,
  }));
}

// Audio paths
const A = {
  alifbo: "/audio/03. alifbo.mp3",
  harakat: "/audio/04. harakat.mp3",
  ro: "/audio/05. ro.mp3",
  za: "/audio/06. za.mp3",
  ma: "/audio/07. ma.mp3",
  ta: "/audio/08. ta.mp3",
  na: "/audio/09. na.mp3",
  ya: "/audio/10. ya.mp3",
  ba: "/audio/11. ba.mp3",
  ka: "/audio/12. ka.mp3",
  la: "/audio/13. la.mp3",
  va: "/audio/14. va.mp3",
  ha5: "/audio/15. ha.mp3",
  fa: "/audio/16. fa.mp3",
  qo: "/audio/17. qo.mp3",
  sha: "/audio/18. sha.mp3",
  sin: "/audio/19. sa.mp3",
  tho: "/audio/20. sa.mp3",
  sod: "/audio/21. so.mp3",
  to: "/audio/22. to.mp3",
  jim: "/audio/23. ja.mp3",
  xo: "/audio/24. xo.mp3",
  ha: "/audio/25. ha.mp3",
  gho: "/audio/26. g'o.mp3",
  ayn: "/audio/27. ayn.mp3",
  dal: "/audio/28. da.mp3",
  zol: "/audio/29. zo.mp3",
  zho: "/audio/30. za.mp3",
  dod: "/audio/31. zo.mp3",
  mad1: "/audio/32. madli 01.mp3",
  mad2: "/audio/33. madli 02.mp3",
  tash: "/audio/34. tashdid.mp3",
  tanv: "/audio/35. tanvin.mp3",
  tantash: "/audio/36. tanvinli tashdid.mp3",
  muq: "/audio/02. muqaddima.mp3",
};

// ============================================================
// PAGE 1 — Muqaddima (1/2)
// ============================================================
const p1: ED[] = [
  ["001", "soz", "Qo'lingizdagi", "", null, 0, 0, 0, 0, 0, 0],
  ["002", "soz", "ushbu", "", null, 0, 0, 0, 0, 0, 0],
  ["003", "soz", "kitobcha", "", null, 0, 0, 0, 0, 0, 0],
  ["004", "soz", "va", "", null, 0, 0, 0, 0, 0, 0],
  ["005", "soz", "uning", "", null, 0, 0, 0, 0, 0, 0],
  ["006", "soz", "muallifiga", "", null, 0, 0, 0, 0, 0, 0],
  ["007", "soz", "chin", "", null, 0, 0, 0, 0, 0, 0],
  ["008", "soz", "ma'noda", "", null, 0, 0, 0, 0, 0, 0],
  ["009", "soz", "baxtli", "", null, 0, 0, 0, 0, 0, 0],
  ["010", "soz", "taqdir", "", null, 0, 0, 0, 0, 0, 0],
  ["011", "soz", "nasib", "", null, 0, 0, 0, 0, 0, 0],
  ["012", "soz", "etgan.", "", null, 0, 0, 0, 0, 0, 0],
  ["013", "soz", "1868-yilning", "", null, 0, 0, 0, 0, 0, 0],
  ["014", "soz", "26-sentyabrida", "", null, 0, 0, 0, 0, 0, 0],
  ["015", "soz", "Qozon", "", null, 0, 0, 0, 0, 0, 0],
  ["016", "soz", "uyezdining", "", null, 0, 0, 0, 0, 0, 0],
  ["017", "soz", "Toshsuv", "", null, 0, 0, 0, 0, 0, 0],
  ["018", "soz", "qishlog'ida", "", null, 0, 0, 0, 0, 0, 0],
  ["019", "soz", "tug'ilib,", "", null, 0, 0, 0, 0, 0, 0],
  ["020", "soz", "Qozondagi", "", null, 0, 0, 0, 0, 0, 0],
  ["021", "soz", "\"Qosimiya\"", "", null, 0, 0, 0, 0, 0, 0],
  ["022", "soz", "madrasasida", "", null, 0, 0, 0, 0, 0, 0],
  ["023", "soz", "ta'lim", "", null, 0, 0, 0, 0, 0, 0],
  ["024", "soz", "olgan", "", null, 0, 0, 0, 0, 0, 0],
  ["025", "soz", "Ahmad", "", null, 0, 0, 0, 0, 0, 0],
  ["026", "soz", "Hodiy", "", null, 0, 0, 0, 0, 0, 0],
  ["027", "soz", "Maqsudiy", "", null, 0, 0, 0, 0, 0, 0],
  ["028", "soz", "rahmatullohi", "", null, 0, 0, 0, 0, 0, 0],
  ["029", "soz", "alayhi", "", null, 0, 0, 0, 0, 0, 0],
  ["030", "soz", "hali", "", null, 0, 0, 0, 0, 0, 0],
  ["031", "soz", "ancha", "", null, 0, 0, 0, 0, 0, 0],
  ["032", "soz", "yoshligida", "", null, 0, 0, 0, 0, 0, 0],
  ["033", "soz", "ushbu", "", null, 0, 0, 0, 0, 0, 0],
  ["034", "soz", "qo'llanmani", "", null, 0, 0, 0, 0, 0, 0],
  ["035", "soz", "tuzar", "", null, 0, 0, 0, 0, 0, 0],
  ["036", "soz", "ekan,", "", null, 0, 0, 0, 0, 0, 0],
  ["037", "soz", "u", "", null, 0, 0, 0, 0, 0, 0],
  ["038", "soz", "asrlar", "", null, 0, 0, 0, 0, 0, 0],
  ["039", "soz", "osha", "", null, 0, 0, 0, 0, 0, 0],
  ["040", "soz", "avloddan-avlodga", "", null, 0, 0, 0, 0, 0, 0],
  ["041", "soz", "Alloh", "", null, 0, 0, 0, 0, 0, 0],
  ["042", "soz", "taoloning", "", null, 0, 0, 0, 0, 0, 0],
  ["043", "soz", "Kalomi", "", null, 0, 0, 0, 0, 0, 0],
  ["044", "soz", "asosida", "", null, 0, 0, 0, 0, 0, 0],
  ["045", "soz", "arab", "", null, 0, 0, 0, 0, 0, 0],
  ["046", "soz", "alifbosida", "", null, 0, 0, 0, 0, 0, 0],
  ["047", "soz", "xat-savod", "", null, 0, 0, 0, 0, 0, 0],
  ["048", "soz", "o'rgatish", "", null, 0, 0, 0, 0, 0, 0],
  ["049", "soz", "bilan", "", null, 0, 0, 0, 0, 0, 0],
  ["050", "soz", "birga", "", null, 0, 0, 0, 0, 0, 0],
  ["051", "soz", "dastlabki", "", null, 0, 0, 0, 0, 0, 0],
  ["052", "soz", "qur'oniy", "", null, 0, 0, 0, 0, 0, 0],
  ["053", "soz", "saboq", "", null, 0, 0, 0, 0, 0, 0],
  ["054", "soz", "berishda", "", null, 0, 0, 0, 0, 0, 0],
  ["055", "soz", "davom", "", null, 0, 0, 0, 0, 0, 0],
  ["056", "soz", "etishini", "", null, 0, 0, 0, 0, 0, 0],
  ["057", "soz", "Parvardigori", "", null, 0, 0, 0, 0, 0, 0],
  ["058", "soz", "olamdan", "", null, 0, 0, 0, 0, 0, 0],
  ["059", "soz", "so'ragani", "", null, 0, 0, 0, 0, 0, 0],
  ["060", "soz", "aniq.", "", null, 0, 0, 0, 0, 0, 0],
  ["061", "soz", "Hozirgi", "", null, 0, 0, 0, 0, 0, 0],
  ["062", "soz", "paytda", "", null, 0, 0, 0, 0, 0, 0],
  ["063", "soz", "bu", "", null, 0, 0, 0, 0, 0, 0],
  ["064", "soz", "sohada", "", null, 0, 0, 0, 0, 0, 0],
  ["065", "soz", "ko'plab", "", null, 0, 0, 0, 0, 0, 0],
  ["066", "soz", "biri-biridan", "", null, 0, 0, 0, 0, 0, 0],
  ["067", "soz", "qiziqarli,", "", null, 0, 0, 0, 0, 0, 0],
  ["068", "soz", "salmoqli", "", null, 0, 0, 0, 0, 0, 0],
  ["069", "soz", "darslik", "", null, 0, 0, 0, 0, 0, 0],
  ["070", "soz", "va", "", null, 0, 0, 0, 0, 0, 0],
  ["071", "soz", "qo'llanmalar", "", null, 0, 0, 0, 0, 0, 0],
  ["072", "soz", "yaratilganiga", "", null, 0, 0, 0, 0, 0, 0],
  ["073", "soz", "qaramasdan,", "", null, 0, 0, 0, 0, 0, 0],
  ["074", "soz", "muallifning", "", null, 0, 0, 0, 0, 0, 0],
  ["075", "soz", "boshqa", "", null, 0, 0, 0, 0, 0, 0],
  ["076", "soz", "asarlari,", "", null, 0, 0, 0, 0, 0, 0],
  ["077", "soz", "jumladan,", "", null, 0, 0, 0, 0, 0, 0],
  ["078", "soz", "\"Ibodati", "", null, 0, 0, 0, 0, 0, 0],
  ["079", "soz", "islomiya\"", "", null, 0, 0, 0, 0, 0, 0],
  ["080", "soz", "singari", "", null, 0, 0, 0, 0, 0, 0],
  ["081", "soz", "bu", "", null, 0, 0, 0, 0, 0, 0],
  ["082", "soz", "mo''jaz", "", null, 0, 0, 0, 0, 0, 0],
  ["083", "soz", "kitobcha", "", null, 0, 0, 0, 0, 0, 0],
  ["084", "soz", "ham", "", null, 0, 0, 0, 0, 0, 0],
  ["085", "soz", "sodda,", "", null, 0, 0, 0, 0, 0, 0],
  ["086", "soz", "o'zlashtirishga", "", null, 0, 0, 0, 0, 0, 0],
  ["087", "soz", "oson", "", null, 0, 0, 0, 0, 0, 0],
  ["088", "soz", "va", "", null, 0, 0, 0, 0, 0, 0],
  ["089", "soz", "dilga", "", null, 0, 0, 0, 0, 0, 0],
  ["090", "soz", "yaqinligi", "", null, 0, 0, 0, 0, 0, 0],
  ["091", "soz", "bilan", "", null, 0, 0, 0, 0, 0, 0],
  ["092", "soz", "hanuzgacha", "", null, 0, 0, 0, 0, 0, 0],
  ["093", "soz", "ko'plab", "", null, 0, 0, 0, 0, 0, 0],
  ["094", "soz", "musulmon", "", null, 0, 0, 0, 0, 0, 0],
  ["095", "soz", "diyorlarida", "", null, 0, 0, 0, 0, 0, 0],
  ["096", "soz", "ilm", "", null, 0, 0, 0, 0, 0, 0],
  ["097", "soz", "toliblarini", "", null, 0, 0, 0, 0, 0, 0],
  ["098", "soz", "o'ziga", "", null, 0, 0, 0, 0, 0, 0],
  ["099", "soz", "tortib", "", null, 0, 0, 0, 0, 0, 0],
  ["100", "soz", "kelayotgani,", "", null, 0, 0, 0, 0, 0, 0],
  ["101", "soz", "albatta,", "", null, 0, 0, 0, 0, 0, 0],
  ["102", "soz", "bu", "", null, 0, 0, 0, 0, 0, 0],
  ["103", "soz", "duoning", "", null, 0, 0, 0, 0, 0, 0],
  ["104", "soz", "ijobatidir.", "", null, 0, 0, 0, 0, 0, 0],
  ["105", "soz", "O'zbekiston", "", null, 0, 0, 0, 0, 0, 0],
  ["106", "soz", "Respublikasi", "", null, 0, 0, 0, 0, 0, 0],
  ["107", "soz", "Fanlar", "", null, 0, 0, 0, 0, 0, 0],
  ["108", "soz", "akademiyasi", "", null, 0, 0, 0, 0, 0, 0],
  ["109", "soz", "Sharqshunoslik", "", null, 0, 0, 0, 0, 0, 0],
  ["110", "soz", "instituti", "", null, 0, 0, 0, 0, 0, 0],
  ["111", "soz", "ko'lyozmalar", "", null, 0, 0, 0, 0, 0, 0],
  ["112", "soz", "xazinasida", "", null, 0, 0, 0, 0, 0, 0],
  ["113", "soz", "saqlanayotgan", "", null, 0, 0, 0, 0, 0, 0],
  ["114", "soz", "hujjatlarga", "", null, 0, 0, 0, 0, 0, 0],
  ["115", "soz", "va", "", null, 0, 0, 0, 0, 0, 0],
  ["116", "soz", "boshqa", "", null, 0, 0, 0, 0, 0, 0],
  ["117", "soz", "manbalarga", "", null, 0, 0, 0, 0, 0, 0],
  ["118", "soz", "asosan,", "", null, 0, 0, 0, 0, 0, 0],
  ["119", "soz", "kitobchaning", "", null, 0, 0, 0, 0, 0, 0],
  ["120", "soz", "Markaziy", "", null, 0, 0, 0, 0, 0, 0],
  ["121", "soz", "Osiyo", "", null, 0, 0, 0, 0, 0, 0],
  ["122", "soz", "hududida", "", null, 0, 0, 0, 0, 0, 0],
  ["123", "soz", "tarqalish", "", null, 0, 0, 0, 0, 0, 0],
  ["124", "soz", "tarixi", "", null, 0, 0, 0, 0, 0, 0],
  ["125", "soz", "quyidagicha", "", null, 0, 0, 0, 0, 0, 0],
  ["126", "soz", "kechganini", "", null, 0, 0, 0, 0, 0, 0],
  ["127", "soz", "taxmin", "", null, 0, 0, 0, 0, 0, 0],
  ["128", "soz", "qilish", "", null, 0, 0, 0, 0, 0, 0],
  ["129", "soz", "mumkin.", "", null, 0, 0, 0, 0, 0, 0],
  ["130", "soz", "1902-yilda", "", null, 0, 0, 0, 0, 0, 0],
  ["131", "soz", "Toshkentda", "", null, 0, 0, 0, 0, 0, 0],
  ["132", "soz", "rus-tuzem", "", null, 0, 0, 0, 0, 0, 0],
  ["133", "soz", "maktablari", "", null, 0, 0, 0, 0, 0, 0],
  ["134", "soz", "o'zbek", "", null, 0, 0, 0, 0, 0, 0],
  ["135", "soz", "sinflari", "", null, 0, 0, 0, 0, 0, 0],
  ["136", "soz", "uchun", "", null, 0, 0, 0, 0, 0, 0],
  ["137", "soz", "Saidrasul", "", null, 0, 0, 0, 0, 0, 0],
  ["138", "soz", "Saidazizov", "", null, 0, 0, 0, 0, 0, 0],
  ["139", "soz", "(1866-1933)", "", null, 0, 0, 0, 0, 0, 0],
  ["140", "soz", "\"Ustodi", "", null, 0, 0, 0, 0, 0, 0],
  ["141", "soz", "avval\"", "", null, 0, 0, 0, 0, 0, 0],
  ["142", "soz", "(\"Birinchi", "", null, 0, 0, 0, 0, 0, 0],
  ["143", "soz", "ustoz\")", "", null, 0, 0, 0, 0, 0, 0],
  ["144", "soz", "qo'llanmasi", "", null, 0, 0, 0, 0, 0, 0],
  ["145", "soz", "nashrdan", "", null, 0, 0, 0, 0, 0, 0],
  ["146", "soz", "chiqadi.", "", null, 0, 0, 0, 0, 0, 0],
  ["147", "soz", "Bu", "", null, 0, 0, 0, 0, 0, 0],
  ["148", "soz", "Urta", "", null, 0, 0, 0, 0, 0, 0],
  ["149", "soz", "Osiyoda", "", null, 0, 0, 0, 0, 0, 0],
  ["150", "soz", "tovush", "", null, 0, 0, 0, 0, 0, 0],
  ["151", "soz", "usuli", "", null, 0, 0, 0, 0, 0, 0],
  ["152", "soz", "(usuli", "", null, 0, 0, 0, 0, 0, 0],
  ["153", "soz", "savtiya)da", "", null, 0, 0, 0, 0, 0, 0],
  ["154", "soz", "tuzilgan", "", null, 0, 0, 0, 0, 0, 0],
  ["155", "soz", "birinchi", "", null, 0, 0, 0, 0, 0, 0],
  ["156", "soz", "darslik", "", null, 0, 0, 0, 0, 0, 0],
  ["157", "soz", "bo'lib,", "", null, 0, 0, 0, 0, 0, 0],
  ["158", "soz", "oktyabr", "", null, 0, 0, 0, 0, 0, 0],
  ["159", "soz", "inqilobiga", "", null, 0, 0, 0, 0, 0, 0],
  ["160", "soz", "qadar", "", null, 0, 0, 0, 0, 0, 0],
  ["161", "soz", "rus-tuzem", "", null, 0, 0, 0, 0, 0, 0],
  ["162", "soz", "maktablaridagina", "", null, 0, 0, 0, 0, 0, 0],
  ["163", "soz", "emas,", "", null, 0, 0, 0, 0, 0, 0],
  ["164", "soz", "yangi", "", null, 0, 0, 0, 0, 0, 0],
  ["165", "soz", "usuldagi", "", null, 0, 0, 0, 0, 0, 0],
  ["166", "soz", "maktablarda", "", null, 0, 0, 0, 0, 0, 0],
  ["167", "soz", "ham", "", null, 0, 0, 0, 0, 0, 0],
  ["168", "soz", "o'zbek", "", null, 0, 0, 0, 0, 0, 0],
  ["169", "soz", "tilidan", "", null, 0, 0, 0, 0, 0, 0],
  ["170", "soz", "asosiy", "", null, 0, 0, 0, 0, 0, 0],
  ["171", "soz", "savod", "", null, 0, 0, 0, 0, 0, 0],
  ["172", "soz", "chiqarish", "", null, 0, 0, 0, 0, 0, 0],
  ["173", "soz", "kitobi", "", null, 0, 0, 0, 0, 0, 0],
  ["174", "soz", "sifatida", "", null, 0, 0, 0, 0, 0, 0],
  ["175", "soz", "qo'llangan.", "", null, 0, 0, 0, 0, 0, 0],
  ["176", "soz", "O'sha", "", null, 0, 0, 0, 0, 0, 0],
  ["177", "soz", "davrda", "", null, 0, 0, 0, 0, 0, 0],
  ["178", "soz", "Rossiyada", "", null, 0, 0, 0, 0, 0, 0],
  ["179", "soz", "Ahmad", "", null, 0, 0, 0, 0, 0, 0],
  ["180", "soz", "Hodiy", "", null, 0, 0, 0, 0, 0, 0],
  ["181", "soz", "Maqsudiyning", "", null, 0, 0, 0, 0, 0, 0],
  ["182", "soz", "ruscha-tatarcha", "", null, 0, 0, 0, 0, 0, 0],
  ["183", "soz", "\"Muallimi", "", null, 0, 0, 0, 0, 0, 0],
  ["184", "soz", "avval\"", "", null, 0, 0, 0, 0, 0, 0],
  ["185", "soz", "qo'llanmasi", "", null, 0, 0, 0, 0, 0, 0],
  ["186", "soz", "keng", "", null, 0, 0, 0, 0, 0, 0],
  ["187", "soz", "shuhrat", "", null, 0, 0, 0, 0, 0, 0],
  ["188", "soz", "qozongan", "", null, 0, 0, 0, 0, 0, 0],
  ["189", "soz", "edi.", "", null, 0, 0, 0, 0, 0, 0],
  ["190", "soz", "Kitobchaning", "", null, 0, 0, 0, 0, 0, 0],
  ["191", "soz", "bizning", "", null, 0, 0, 0, 0, 0, 0],
  ["192", "soz", "yurtimizda", "", null, 0, 0, 0, 0, 0, 0],
  ["193", "soz", "nashr", "", null, 0, 0, 0, 0, 0, 0],
  ["194", "soz", "etilgan", "", null, 0, 0, 0, 0, 0, 0],
  ["195", "soz", "keyingi", "", null, 0, 0, 0, 0, 0, 0],
  ["196", "soz", "barcha", "", null, 0, 0, 0, 0, 0, 0],
  ["197", "soz", "nashrlariga", "", null, 0, 0, 0, 0, 0, 0],
  ["198", "soz", "asos", "", null, 0, 0, 0, 0, 0, 0],
  ["199", "soz", "bo'lib", "", null, 0, 0, 0, 0, 0, 0],
  ["200", "soz", "xizmat", "", null, 0, 0, 0, 0, 0, 0],
  ["201", "soz", "qilgan", "", null, 0, 0, 0, 0, 0, 0],
  ["202", "soz", "nusxasi", "", null, 0, 0, 0, 0, 0, 0],
  ["203", "soz", "sarvarag'ida", "", null, 0, 0, 0, 0, 0, 0],
  ["204", "soz", "buni", "", null, 0, 0, 0, 0, 0, 0],
  ["205", "soz", "tasdiqlovchi", "", null, 0, 0, 0, 0, 0, 0],
  ["206", "soz", "rasmiy", "", null, 0, 0, 0, 0, 0, 0],
  ["207", "soz", "ma'lumotlar", "", null, 0, 0, 0, 0, 0, 0],
  ["208", "soz", "keltiriladi.", "", null, 0, 0, 0, 0, 0, 0],
  ["209", "soz", "Ushbu", "", null, 0, 0, 0, 0, 0, 0],
  ["210", "soz", "alifbo", "", null, 0, 0, 0, 0, 0, 0],
  ["211", "soz", "1913-yil", "", null, 0, 0, 0, 0, 0, 0],
  ["212", "soz", "9-aprelda", "", null, 0, 0, 0, 0, 0, 0],
  ["213", "soz", "muayyan", "", null, 0, 0, 0, 0, 0, 0],
  ["214", "soz", "raqamli", "", null, 0, 0, 0, 0, 0, 0],
  ["215", "soz", "hujjat", "", null, 0, 0, 0, 0, 0, 0],
  ["216", "soz", "bilan", "", null, 0, 0, 0, 0, 0, 0],
  ["217", "soz", "tatar", "", null, 0, 0, 0, 0, 0, 0],
  ["218", "soz", "va", "", null, 0, 0, 0, 0, 0, 0],
  ["219", "soz", "rus-tatar", "", null, 0, 0, 0, 0, 0, 0],
  ["220", "soz", "maktablarida", "", null, 0, 0, 0, 0, 0, 0],
  ["221", "soz", "sinfda", "", null, 0, 0, 0, 0, 0, 0],
  ["222", "soz", "foydalanishga", "", null, 0, 0, 0, 0, 0, 0],
  ["223", "soz", "kiritilgani", "", null, 0, 0, 0, 0, 0, 0],
  ["224", "soz", "qayd", "", null, 0, 0, 0, 0, 0, 0],
  ["225", "soz", "etilgach,", "", null, 0, 0, 0, 0, 0, 0],
  ["226", "soz", "yana", "", null, 0, 0, 0, 0, 0, 0],
  ["227", "soz", "bunday", "", null, 0, 0, 0, 0, 0, 0],
  ["228", "soz", "ta'kidlanadi:", "", null, 0, 0, 0, 0, 0, 0],
  ["229", "soz", "\"Un", "", null, 0, 0, 0, 0, 0, 0],
  ["230", "soz", "to'rtinchi", "", null, 0, 0, 0, 0, 0, 0],
  ["231", "soz", "nashri.", "", null, 0, 0, 0, 0, 0, 0],
  ["232", "soz", "Birinchi", "", null, 0, 0, 0, 0, 0, 0],
  ["233", "soz", "nashriga", "", null, 0, 0, 0, 0, 0, 0],
  ["234", "soz", "1892-yil", "", null, 0, 0, 0, 0, 0, 0],
  ["235", "soz", "28-yanvarda", "", null, 0, 0, 0, 0, 0, 0],
  ["236", "soz", "Petrograd", "", null, 0, 0, 0, 0, 0, 0],
  ["237", "soz", "senzurasi", "", null, 0, 0, 0, 0, 0, 0],
  ["238", "soz", "ruxsat", "", null, 0, 0, 0, 0, 0, 0],
  ["239", "soz", "bergan.", "", null, 0, 0, 0, 0, 0, 0],
  ["240", "soz", "\"Umid\"", "", null, 0, 0, 0, 0, 0, 0],
  ["241", "soz", "shirkati", "", null, 0, 0, 0, 0, 0, 0],
  ["242", "soz", "matbaasi.", "", null, 0, 0, 0, 0, 0, 0],
  ["243", "soz", "Qozon,", "", null, 0, 0, 0, 0, 0, 0],
  ["244", "soz", "1917", "", null, 0, 0, 0, 0, 0, 0],
  ["245", "soz", "y.\".", "", null, 0, 0, 0, 0, 0, 0],
  ["246", "soz", "Bundan", "", null, 0, 0, 0, 0, 0, 0],
  ["247", "soz", "kelib", "", null, 0, 0, 0, 0, 0, 0],
  ["248", "soz", "chiqadiki,", "", null, 0, 0, 0, 0, 0, 0],
  ["249", "soz", "birinchi", "", null, 0, 0, 0, 0, 0, 0],
  ["250", "soz", "nashriga", "", null, 0, 0, 0, 0, 0, 0],
  ["251", "soz", "ruxsat", "", null, 0, 0, 0, 0, 0, 0],
  ["252", "soz", "berilgach,", "", null, 0, 0, 0, 0, 0, 0],
  ["253", "soz", "kitobcha", "", null, 0, 0, 0, 0, 0, 0],
  ["254", "soz", "yigirma", "", null, 0, 0, 0, 0, 0, 0],
  ["255", "soz", "yildan", "", null, 0, 0, 0, 0, 0, 0],
  ["256", "soz", "ko'proq", "", null, 0, 0, 0, 0, 0, 0],
  ["257", "soz", "muddat", "", null, 0, 0, 0, 0, 0, 0],
  ["258", "soz", "mobaynida", "", null, 0, 0, 0, 0, 0, 0],
  ["259", "soz", "norasmiy", "", null, 0, 0, 0, 0, 0, 0],
  ["260", "soz", "ravishda", "", null, 0, 0, 0, 0, 0, 0],
  ["261", "soz", "xalq", "", null, 0, 0, 0, 0, 0, 0],
  ["262", "soz", "ta'limi", "", null, 0, 0, 0, 0, 0, 0],
  ["263", "soz", "sohasida", "", null, 0, 0, 0, 0, 0, 0],
  ["264", "soz", "obru", "", null, 0, 0, 0, 0, 0, 0],
  ["265", "soz", "qozonib", "", null, 0, 0, 0, 0, 0, 0],
  ["266", "soz", "ulgurgach,", "", null, 0, 0, 0, 0, 0, 0],
  ["267", "soz", "davlat", "", null, 0, 0, 0, 0, 0, 0],
  ["268", "soz", "unga", "", null, 0, 0, 0, 0, 0, 0],
  ["269", "soz", "maktablar", "", null, 0, 0, 0, 0, 0, 0],
  ["270", "soz", "uchun", "", null, 0, 0, 0, 0, 0, 0],
  ["271", "soz", "rasmiy", "", null, 0, 0, 0, 0, 0, 0],
  ["272", "soz", "qo'llanma", "", null, 0, 0, 0, 0, 0, 0],
  ["273", "soz", "maqomini", "", null, 0, 0, 0, 0, 0, 0],
  ["274", "soz", "berishga", "", null, 0, 0, 0, 0, 0, 0],
  ["275", "soz", "majbur", "", null, 0, 0, 0, 0, 0, 0],
  ["276", "soz", "bo'lgan.", "", null, 0, 0, 0, 0, 0, 0],
  ["277", "soz", "Shu", "", null, 0, 0, 0, 0, 0, 0],
  ["278", "soz", "davrdan", "", null, 0, 0, 0, 0, 0, 0],
  ["279", "soz", "e'tiboran", "", null, 0, 0, 0, 0, 0, 0],
  ["280", "soz", "kitobcha", "", null, 0, 0, 0, 0, 0, 0],
  ["281", "soz", "Rossiya", "", null, 0, 0, 0, 0, 0, 0],
  ["282", "soz", "imperiyasi,", "", null, 0, 0, 0, 0, 0, 0],
  ["283", "soz", "keyinchalik", "", null, 0, 0, 0, 0, 0, 0],
  ["284", "soz", "sobiq", "", null, 0, 0, 0, 0, 0, 0],
  ["285", "soz", "Sovet", "", null, 0, 0, 0, 0, 0, 0],
  ["286", "soz", "Ittifoqi", "", null, 0, 0, 0, 0, 0, 0],
  ["287", "soz", "hududidagi", "", null, 0, 0, 0, 0, 0, 0],
  ["288", "soz", "musulmon", "", null, 0, 0, 0, 0, 0, 0],
  ["289", "soz", "o'lkalarda", "", null, 0, 0, 0, 0, 0, 0],
  ["290", "soz", "avval", "", null, 0, 0, 0, 0, 0, 0],
  ["291", "soz", "lotin,", "", null, 0, 0, 0, 0, 0, 0],
  ["292", "soz", "so'ngra", "", null, 0, 0, 0, 0, 0, 0],
  ["293", "soz", "kirill", "", null, 0, 0, 0, 0, 0, 0],
  ["294", "soz", "alifbosi", "", null, 0, 0, 0, 0, 0, 0],
  ["295", "soz", "muomalaga", "", null, 0, 0, 0, 0, 0, 0],
  ["296", "soz", "kiritilganiga", "", null, 0, 0, 0, 0, 0, 0],
  ["297", "soz", "qadar", "", null, 0, 0, 0, 0, 0, 0],
  ["298", "soz", "shu", "", null, 0, 0, 0, 0, 0, 0],
  ["299", "soz", "vazifani", "", null, 0, 0, 0, 0, 0, 0],
  ["300", "soz", "bajarib", "", null, 0, 0, 0, 0, 0, 0],
  ["301", "soz", "keldi.", "", null, 0, 0, 0, 0, 0, 0],
  ["302", "soz", "Kitobcha", "", null, 0, 0, 0, 0, 0, 0],
  ["303", "soz", "1917-yilga", "", null, 0, 0, 0, 0, 0, 0],
  ["304", "soz", "qadar", "", null, 0, 0, 0, 0, 0, 0],
  ["305", "soz", "o'n", "", null, 0, 0, 0, 0, 0, 0],
  ["306", "soz", "to'rt", "", null, 0, 0, 0, 0, 0, 0],
  ["307", "soz", "marta,", "", null, 0, 0, 0, 0, 0, 0],
  ["308", "soz", "keyingi", "", null, 0, 0, 0, 0, 0, 0],
  ["309", "soz", "davrlarda", "", null, 0, 0, 0, 0, 0, 0],
  ["310", "soz", "yana", "", null, 0, 0, 0, 0, 0, 0],
  ["311", "soz", "necha", "", null, 0, 0, 0, 0, 0, 0],
  ["312", "soz", "o'nlab", "", null, 0, 0, 0, 0, 0, 0],
  ["313", "soz", "bora", "", null, 0, 0, 0, 0, 0, 0],
  ["314", "soz", "nashr", "", null, 0, 0, 0, 0, 0, 0],
  ["315", "soz", "etilganining", "", null, 0, 0, 0, 0, 0, 0],
  ["316", "soz", "o'zi", "", null, 0, 0, 0, 0, 0, 0],
  ["317", "soz", "buning", "", null, 0, 0, 0, 0, 0, 0],
  ["318", "soz", "yorqin", "", null, 0, 0, 0, 0, 0, 0],
  ["319", "soz", "isbotidir.", "", null, 0, 0, 0, 0, 0, 0],
  ["320", "soz", "Jumladan,", "", null, 0, 0, 0, 0, 0, 0],
  ["321", "soz", "1913-yili", "", null, 0, 0, 0, 0, 0, 0],
  ["322", "soz", "Toshkentda", "", null, 0, 0, 0, 0, 0, 0],
  ["323", "soz", "ham", "", null, 0, 0, 0, 0, 0, 0],
  ["324", "soz", "faqat", "", null, 0, 0, 0, 0, 0, 0],
  ["325", "soz", "noshir", "", null, 0, 0, 0, 0, 0, 0],
  ["326", "soz", "Ali", "", null, 0, 0, 0, 0, 0, 0],
  ["327", "soz", "Asg'ar", "", null, 0, 0, 0, 0, 0, 0],
  ["328", "soz", "(Kalinin)", "", null, 0, 0, 0, 0, 0, 0],
  ["329", "soz", "ismi", "", null, 0, 0, 0, 0, 0, 0],
  ["330", "soz", "ko'rsatilgan", "", null, 0, 0, 0, 0, 0, 0],
  ["331", "soz", "\"Muallimi", "", null, 0, 0, 0, 0, 0, 0],
  ["332", "soz", "soniy\"", "", null, 0, 0, 0, 0, 0, 0],
  ["333", "soz", "kitobchasi", "", null, 0, 0, 0, 0, 0, 0],
  ["334", "soz", "paydo", "", null, 0, 0, 0, 0, 0, 0],
  ["335", "soz", "bo'ladiki,", "", null, 0, 0, 0, 0, 0, 0],
  ["336", "soz", "u", "", null, 0, 0, 0, 0, 0, 0],
  ["337", "soz", "mazmunan", "", null, 0, 0, 0, 0, 0, 0],
  ["338", "soz", "aynan", "", null, 0, 0, 0, 0, 0, 0],
  ["339", "soz", "Maqsudiyning", "", null, 0, 0, 0, 0, 0, 0],
  ["340", "soz", "biz", "", null, 0, 0, 0, 0, 0, 0],
  ["341", "soz", "fikr", "", null, 0, 0, 0, 0, 0, 0],
  ["342", "soz", "yuritayotgan", "", null, 0, 0, 0, 0, 0, 0],
  ["343", "soz", "qo'llanmasiga", "", null, 0, 0, 0, 0, 0, 0],
  ["344", "soz", "muvofiq", "", null, 0, 0, 0, 0, 0, 0],
  ["345", "soz", "kelardi.", "", null, 0, 0, 0, 0, 0, 0],
  ["346", "soz", "Albatta,", "", null, 0, 0, 0, 0, 0, 0],
  ["347", "soz", "qo'llanmaning", "", null, 0, 0, 0, 0, 0, 0],
  ["348", "soz", "keyingi", "", null, 0, 0, 0, 0, 0, 0],
  ["349", "soz", "nashrlari", "", null, 0, 0, 0, 0, 0, 0],
  ["350", "soz", "muallif", "", null, 0, 0, 0, 0, 0, 0],
  ["351", "soz", "ismi", "", null, 0, 0, 0, 0, 0, 0],
  ["352", "soz", "sharifi", "", null, 0, 0, 0, 0, 0, 0],
  ["353", "soz", "bilan", "", null, 0, 0, 0, 0, 0, 0],
  ["354", "soz", "qayta-qayta", "", null, 0, 0, 0, 0, 0, 0],
  ["355", "soz", "chiqib", "", null, 0, 0, 0, 0, 0, 0],
  ["356", "soz", "turdi.", "", null, 0, 0, 0, 0, 0, 0],
  ["357", "soz", "O'shandan", "", null, 0, 0, 0, 0, 0, 0],
  ["358", "soz", "buyon", "", null, 0, 0, 0, 0, 0, 0],
  ["359", "soz", "u", "", null, 0, 0, 0, 0, 0, 0],
  ["360", "soz", "faqat", "", null, 0, 0, 0, 0, 0, 0],
  ["361", "soz", "bizdagina", "", null, 0, 0, 0, 0, 0, 0],
  ["362", "soz", "emas,", "", null, 0, 0, 0, 0, 0, 0],
  ["363", "soz", "balki", "", null, 0, 0, 0, 0, 0, 0],
  ["364", "soz", "boshqa", "", null, 0, 0, 0, 0, 0, 0],
  ["365", "soz", "ko'plab", "", null, 0, 0, 0, 0, 0, 0],
  ["366", "soz", "mamlakatlarda", "", null, 0, 0, 0, 0, 0, 0],
  ["367", "soz", "avlodlarga", "", null, 0, 0, 0, 0, 0, 0],
  ["368", "soz", "tengsiz", "", null, 0, 0, 0, 0, 0, 0],
  ["369", "soz", "beminnat", "", null, 0, 0, 0, 0, 0, 0],
  ["370", "soz", "muallimlik", "", null, 0, 0, 0, 0, 0, 0],
  ["371", "soz", "qilib", "", null, 0, 0, 0, 0, 0, 0],
  ["372", "soz", "keladi.", "", null, 0, 0, 0, 0, 0, 0],
];

// ============================================================
// PAGE 2 — Muqaddima (2/2)
// ============================================================
const p2: ED[] = [
  ["001", "soz", "Shularni", "", null, 0, 0, 0, 0, 0, 0],
  ["002", "soz", "hisobga", "", null, 0, 0, 0, 0, 0, 0],
  ["003", "soz", "olgan", "", null, 0, 0, 0, 0, 0, 0],
  ["004", "soz", "holda,", "", null, 0, 0, 0, 0, 0, 0],
  ["005", "soz", "mazkur", "", null, 0, 0, 0, 0, 0, 0],
  ["006", "soz", "qo'llanmani", "", null, 0, 0, 0, 0, 0, 0],
  ["007", "soz", "holicha,", "", null, 0, 0, 0, 0, 0, 0],
  ["008", "soz", "ya'ni", "", null, 0, 0, 0, 0, 0, 0],
  ["009", "soz", "nusxa", "", null, 0, 0, 0, 0, 0, 0],
  ["010", "soz", "ko'chirilaverishidan", "", null, 0, 0, 0, 0, 0, 0],
  ["011", "soz", "xiralashib", "", null, 0, 0, 0, 0, 0, 0],
  ["012", "soz", "qolgan", "", null, 0, 0, 0, 0, 0, 0],
  ["013", "soz", "xatini", "", null, 0, 0, 0, 0, 0, 0],
  ["014", "soz", "tiniqlashtirgan", "", null, 0, 0, 0, 0, 0, 0],
  ["015", "soz", "va", "", null, 0, 0, 0, 0, 0, 0],
  ["016", "soz", "boshqa", "", null, 0, 0, 0, 0, 0, 0],
  ["017", "soz", "juz'iy", "", null, 0, 0, 0, 0, 0, 0],
  ["018", "soz", "texnik", "", null, 0, 0, 0, 0, 0, 0],
  ["019", "soz", "xatolarni", "", null, 0, 0, 0, 0, 0, 0],
  ["020", "soz", "tuzatgan", "", null, 0, 0, 0, 0, 0, 0],
  ["021", "soz", "holda,", "", null, 0, 0, 0, 0, 0, 0],
  ["022", "soz", "o'quvchilarga", "", null, 0, 0, 0, 0, 0, 0],
  ["023", "soz", "taqdim", "", null, 0, 0, 0, 0, 0, 0],
  ["024", "soz", "etishga", "", null, 0, 0, 0, 0, 0, 0],
  ["025", "soz", "qaror", "", null, 0, 0, 0, 0, 0, 0],
  ["026", "soz", "qilindi.", "", null, 0, 0, 0, 0, 0, 0],
  ["027", "soz", "Albatta,", "", null, 0, 0, 0, 0, 0, 0],
  ["028", "soz", "bugungi", "", null, 0, 0, 0, 0, 0, 0],
  ["029", "soz", "kunda", "", null, 0, 0, 0, 0, 0, 0],
  ["030", "soz", "Madina", "", null, 0, 0, 0, 0, 0, 0],
  ["031", "soz", "bosma", "", null, 0, 0, 0, 0, 0, 0],
  ["032", "soz", "mushaflar", "", null, 0, 0, 0, 0, 0, 0],
  ["033", "soz", "keng", "", null, 0, 0, 0, 0, 0, 0],
  ["034", "soz", "ommalashgani", "", null, 0, 0, 0, 0, 0, 0],
  ["035", "soz", "bois", "", null, 0, 0, 0, 0, 0, 0],
  ["036", "soz", "dastalab", "", null, 0, 0, 0, 0, 0, 0],
  ["037", "soz", "ushbu", "", null, 0, 0, 0, 0, 0, 0],
  ["038", "soz", "kitobchani", "", null, 0, 0, 0, 0, 0, 0],
  ["039", "soz", "ham", "", null, 0, 0, 0, 0, 0, 0],
  ["040", "soz", "ularga", "", null, 0, 0, 0, 0, 0, 0],
  ["041", "soz", "monand", "", null, 0, 0, 0, 0, 0, 0],
  ["042", "soz", "o'zgartirish", "", null, 0, 0, 0, 0, 0, 0],
  ["043", "soz", "rejasi", "", null, 0, 0, 0, 0, 0, 0],
  ["044", "soz", "ham", "", null, 0, 0, 0, 0, 0, 0],
  ["045", "soz", "yo'q", "", null, 0, 0, 0, 0, 0, 0],
  ["046", "soz", "emasdi.", "", null, 0, 0, 0, 0, 0, 0],
  ["047", "soz", "Birok,", "", null, 0, 0, 0, 0, 0, 0],
  ["048", "soz", "bir", "", null, 0, 0, 0, 0, 0, 0],
  ["049", "soz", "jihati,", "", null, 0, 0, 0, 0, 0, 0],
  ["050", "soz", "uzoq", "", null, 0, 0, 0, 0, 0, 0],
  ["051", "soz", "davr", "", null, 0, 0, 0, 0, 0, 0],
  ["052", "soz", "davomida", "", null, 0, 0, 0, 0, 0, 0],
  ["053", "soz", "xalqlarga", "", null, 0, 0, 0, 0, 0, 0],
  ["054", "soz", "qadrdon", "", null, 0, 0, 0, 0, 0, 0],
  ["055", "soz", "bo'lib,", "", null, 0, 0, 0, 0, 0, 0],
  ["056", "soz", "yaxshi", "", null, 0, 0, 0, 0, 0, 0],
  ["057", "soz", "xizmat", "", null, 0, 0, 0, 0, 0, 0],
  ["058", "soz", "kilib", "", null, 0, 0, 0, 0, 0, 0],
  ["059", "soz", "kelayotgan", "", null, 0, 0, 0, 0, 0, 0],
  ["060", "soz", "kitobchani", "", null, 0, 0, 0, 0, 0, 0],
  ["061", "soz", "asl", "", null, 0, 0, 0, 0, 0, 0],
  ["062", "soz", "xolicha", "", null, 0, 0, 0, 0, 0, 0],
  ["063", "soz", "saqlab", "", null, 0, 0, 0, 0, 0, 0],
  ["064", "soz", "kolish", "", null, 0, 0, 0, 0, 0, 0],
  ["065", "soz", "uni", "", null, 0, 0, 0, 0, 0, 0],
  ["066", "soz", "yaratgan", "", null, 0, 0, 0, 0, 0, 0],
  ["067", "soz", "va", "", null, 0, 0, 0, 0, 0, 0],
  ["068", "soz", "shu", "", null, 0, 0, 0, 0, 0, 0],
  ["069", "soz", "asosda", "", null, 0, 0, 0, 0, 0, 0],
  ["070", "soz", "ilm", "", null, 0, 0, 0, 0, 0, 0],
  ["071", "soz", "maydoniga", "", null, 0, 0, 0, 0, 0, 0],
  ["072", "soz", "qadam", "", null, 0, 0, 0, 0, 0, 0],
  ["073", "soz", "qo'ygan", "", null, 0, 0, 0, 0, 0, 0],
  ["074", "soz", "ajdodlarimiz", "", null, 0, 0, 0, 0, 0, 0],
  ["075", "soz", "xotirasiga", "", null, 0, 0, 0, 0, 0, 0],
  ["076", "soz", "hurmat", "", null, 0, 0, 0, 0, 0, 0],
  ["077", "soz", "va", "", null, 0, 0, 0, 0, 0, 0],
  ["078", "soz", "minnatdorlik", "", null, 0, 0, 0, 0, 0, 0],
  ["079", "soz", "belgisi", "", null, 0, 0, 0, 0, 0, 0],
  ["080", "soz", "bo'lib", "", null, 0, 0, 0, 0, 0, 0],
  ["081", "soz", "tuyuldi.", "", null, 0, 0, 0, 0, 0, 0],
  ["082", "soz", "Shunga", "", null, 0, 0, 0, 0, 0, 0],
  ["083", "soz", "ko'ra,", "", null, 0, 0, 0, 0, 0, 0],
  ["084", "soz", "qo'llanmaning", "", null, 0, 0, 0, 0, 0, 0],
  ["085", "soz", "asl", "", null, 0, 0, 0, 0, 0, 0],
  ["086", "soz", "ruhiyatini", "", null, 0, 0, 0, 0, 0, 0],
  ["087", "soz", "saqlab", "", null, 0, 0, 0, 0, 0, 0],
  ["088", "soz", "qolish", "", null, 0, 0, 0, 0, 0, 0],
  ["089", "soz", "maqsadidan", "", null, 0, 0, 0, 0, 0, 0],
  ["090", "soz", "kelib", "", null, 0, 0, 0, 0, 0, 0],
  ["091", "soz", "chiqib,", "", null, 0, 0, 0, 0, 0, 0],
  ["092", "soz", "kitobga", "", null, 0, 0, 0, 0, 0, 0],
  ["093", "soz", "deyarli", "", null, 0, 0, 0, 0, 0, 0],
  ["094", "soz", "o'zgarish", "", null, 0, 0, 0, 0, 0, 0],
  ["095", "soz", "kiritilmadi.", "", null, 0, 0, 0, 0, 0, 0],
  ["096", "soz", "Faqatgina", "", null, 0, 0, 0, 0, 0, 0],
  ["097", "soz", "suralarning", "", null, 0, 0, 0, 0, 0, 0],
  ["098", "soz", "xati", "", null, 0, 0, 0, 0, 0, 0],
  ["099", "soz", "diyorimizda", "", null, 0, 0, 0, 0, 0, 0],
  ["100", "soz", "Madina", "", null, 0, 0, 0, 0, 0, 0],
  ["101", "soz", "bosma", "", null, 0, 0, 0, 0, 0, 0],
  ["102", "soz", "mushaflar", "", null, 0, 0, 0, 0, 0, 0],
  ["103", "soz", "ommalashgani", "", null, 0, 0, 0, 0, 0, 0],
  ["104", "soz", "bois", "", null, 0, 0, 0, 0, 0, 0],
  ["105", "soz", "harflar", "", null, 0, 0, 0, 0, 0, 0],
  ["106", "soz", "ko'zga", "", null, 0, 0, 0, 0, 0, 0],
  ["107", "soz", "moslashishi", "", null, 0, 0, 0, 0, 0, 0],
  ["108", "soz", "oson", "", null, 0, 0, 0, 0, 0, 0],
  ["109", "soz", "bo'lishi", "", null, 0, 0, 0, 0, 0, 0],
  ["110", "soz", "uchun", "", null, 0, 0, 0, 0, 0, 0],
  ["111", "soz", "Madina", "", null, 0, 0, 0, 0, 0, 0],
  ["112", "soz", "bosma", "", null, 0, 0, 0, 0, 0, 0],
  ["113", "soz", "xatida,", "", null, 0, 0, 0, 0, 0, 0],
  ["114", "soz", "harakatlari", "", null, 0, 0, 0, 0, 0, 0],
  ["115", "soz", "esa", "", null, 0, 0, 0, 0, 0, 0],
  ["116", "soz", "Qozon", "", null, 0, 0, 0, 0, 0, 0],
  ["117", "soz", "bosma", "", null, 0, 0, 0, 0, 0, 0],
  ["118", "soz", "holatida", "", null, 0, 0, 0, 0, 0, 0],
  ["119", "soz", "qoldi.", "", null, 0, 0, 0, 0, 0, 0],
  ["120", "soz", "Shuningdek,", "", null, 0, 0, 0, 0, 0, 0],
  ["121", "soz", "asosiy", "", null, 0, 0, 0, 0, 0, 0],
  ["122", "soz", "maqsad", "", null, 0, 0, 0, 0, 0, 0],
  ["123", "soz", "o'quvchi", "", null, 0, 0, 0, 0, 0, 0],
  ["124", "soz", "arab", "", null, 0, 0, 0, 0, 0, 0],
  ["125", "soz", "xatini", "", null, 0, 0, 0, 0, 0, 0],
  ["126", "soz", "shunchaki", "", null, 0, 0, 0, 0, 0, 0],
  ["127", "soz", "o'qishnigina", "", null, 0, 0, 0, 0, 0, 0],
  ["128", "soz", "emas,", "", null, 0, 0, 0, 0, 0, 0],
  ["129", "soz", "balki", "", null, 0, 0, 0, 0, 0, 0],
  ["130", "soz", "boshdanok", "", null, 0, 0, 0, 0, 0, 0],
  ["131", "soz", "har", "", null, 0, 0, 0, 0, 0, 0],
  ["132", "soz", "bir", "", null, 0, 0, 0, 0, 0, 0],
  ["133", "soz", "harfni", "", null, 0, 0, 0, 0, 0, 0],
  ["134", "soz", "maxraji", "", null, 0, 0, 0, 0, 0, 0],
  ["135", "soz", "(joy-joyidan)", "", null, 0, 0, 0, 0, 0, 0],
  ["136", "soz", "chiqarishni", "", null, 0, 0, 0, 0, 0, 0],
  ["137", "soz", "yaxshi", "", null, 0, 0, 0, 0, 0, 0],
  ["138", "soz", "o'rganish", "", null, 0, 0, 0, 0, 0, 0],
  ["139", "soz", "orqali", "", null, 0, 0, 0, 0, 0, 0],
  ["140", "soz", "Qur'on", "", null, 0, 0, 0, 0, 0, 0],
  ["141", "soz", "suralari", "", null, 0, 0, 0, 0, 0, 0],
  ["142", "soz", "qiroatiga", "", null, 0, 0, 0, 0, 0, 0],
  ["143", "soz", "go'zal", "", null, 0, 0, 0, 0, 0, 0],
  ["144", "soz", "talaffuz", "", null, 0, 0, 0, 0, 0, 0],
  ["145", "soz", "bilan", "", null, 0, 0, 0, 0, 0, 0],
  ["146", "soz", "kirishuvini", "", null, 0, 0, 0, 0, 0, 0],
  ["147", "soz", "ko'zlab,", "", null, 0, 0, 0, 0, 0, 0],
  ["148", "soz", "kitobga", "", null, 0, 0, 0, 0, 0, 0],
  ["149", "soz", "ovoz", "", null, 0, 0, 0, 0, 0, 0],
  ["150", "soz", "tushirilgan", "", null, 0, 0, 0, 0, 0, 0],
  ["151", "soz", "disk", "", null, 0, 0, 0, 0, 0, 0],
  ["152", "soz", "ham", "", null, 0, 0, 0, 0, 0, 0],
  ["153", "soz", "ilova", "", null, 0, 0, 0, 0, 0, 0],
  ["154", "soz", "qilinmoqda.", "", null, 0, 0, 0, 0, 0, 0],
  ["155", "soz", "Talaba", "", null, 0, 0, 0, 0, 0, 0],
  ["156", "soz", "darsni", "", null, 0, 0, 0, 0, 0, 0],
  ["157", "soz", "o'zlashtirish", "", null, 0, 0, 0, 0, 0, 0],
  ["158", "soz", "jarayonida", "", null, 0, 0, 0, 0, 0, 0],
  ["159", "soz", "diskdagi", "", null, 0, 0, 0, 0, 0, 0],
  ["160", "soz", "ovozga", "", null, 0, 0, 0, 0, 0, 0],
  ["161", "soz", "diqqat", "", null, 0, 0, 0, 0, 0, 0],
  ["162", "soz", "qilgan", "", null, 0, 0, 0, 0, 0, 0],
  ["163", "soz", "holda,", "", null, 0, 0, 0, 0, 0, 0],
  ["164", "soz", "harflarning", "", null, 0, 0, 0, 0, 0, 0],
  ["165", "soz", "talaffuz", "", null, 0, 0, 0, 0, 0, 0],
  ["166", "soz", "sifati", "", null, 0, 0, 0, 0, 0, 0],
  ["167", "soz", "hamda", "", null, 0, 0, 0, 0, 0, 0],
  ["168", "soz", "fatha,", "", null, 0, 0, 0, 0, 0, 0],
  ["169", "soz", "kasra,", "", null, 0, 0, 0, 0, 0, 0],
  ["170", "soz", "zammadan", "", null, 0, 0, 0, 0, 0, 0],
  ["171", "soz", "iborat", "", null, 0, 0, 0, 0, 0, 0],
  ["172", "soz", "harakatlarning", "", null, 0, 0, 0, 0, 0, 0],
  ["173", "soz", "ado", "", null, 0, 0, 0, 0, 0, 0],
  ["174", "soz", "etilishiga", "", null, 0, 0, 0, 0, 0, 0],
  ["175", "soz", "e'tibor", "", null, 0, 0, 0, 0, 0, 0],
  ["176", "soz", "qaratmog'i", "", null, 0, 0, 0, 0, 0, 0],
  ["177", "soz", "lozim.", "", null, 0, 0, 0, 0, 0, 0],
  ["178", "soz", "Chunki", "", null, 0, 0, 0, 0, 0, 0],
  ["179", "soz", "Qur'on", "", null, 0, 0, 0, 0, 0, 0],
  ["180", "soz", "qiroatida", "", null, 0, 0, 0, 0, 0, 0],
  ["181", "soz", "aksar", "", null, 0, 0, 0, 0, 0, 0],
  ["182", "soz", "xatolar", "", null, 0, 0, 0, 0, 0, 0],
  ["183", "soz", "(zod)", "", null, 0, 0, 0, 0, 0, 0],
  ["184", "soz", "o'rniga", "", null, 0, 0, 0, 0, 0, 0],
  ["185", "soz", "(30)", "", null, 0, 0, 0, 0, 0, 0],
  ["186", "soz", "tovushi,", "", null, 0, 0, 0, 0, 0, 0],
  ["187", "soz", "(sod)", "", null, 0, 0, 0, 0, 0, 0],
  ["188", "soz", "o'rniga", "", null, 0, 0, 0, 0, 0, 0],
  ["189", "soz", "(sin)", "", null, 0, 0, 0, 0, 0, 0],
  ["190", "soz", "yoki", "", null, 0, 0, 0, 0, 0, 0],
  ["191", "soz", "(se)", "", null, 0, 0, 0, 0, 0, 0],
  ["192", "soz", "tovushiga", "", null, 0, 0, 0, 0, 0, 0],
  ["193", "soz", "o'xshatib,", "", null, 0, 0, 0, 0, 0, 0],
  ["194", "soz", "maxrajidan", "", null, 0, 0, 0, 0, 0, 0],
  ["195", "soz", "boshqa", "", null, 0, 0, 0, 0, 0, 0],
  ["196", "soz", "joydan", "", null, 0, 0, 0, 0, 0, 0],
  ["197", "soz", "chiqarilishi;", "", null, 0, 0, 0, 0, 0, 0],
  ["198", "soz", "jarangli", "", null, 0, 0, 0, 0, 0, 0],
  ["199", "soz", "(be)", "", null, 0, 0, 0, 0, 0, 0],
  ["200", "soz", "jarangsiz", "", null, 0, 0, 0, 0, 0, 0],
  ["201", "soz", "(pe)", "", null, 0, 0, 0, 0, 0, 0],
  ["202", "soz", "tovushiga", "", null, 0, 0, 0, 0, 0, 0],
  ["203", "soz", "o'xshatib", "", null, 0, 0, 0, 0, 0, 0],
  ["204", "soz", "talaffuz", "", null, 0, 0, 0, 0, 0, 0],
  ["205", "soz", "etilishi;", "", null, 0, 0, 0, 0, 0, 0],
  ["206", "soz", "sukunli", "", null, 0, 0, 0, 0, 0, 0],
  ["207", "soz", "\"mim\",", "", null, 0, 0, 0, 0, 0, 0],
  ["208", "soz", "\"nun\"", "", null, 0, 0, 0, 0, 0, 0],
  ["209", "soz", "va", "", null, 0, 0, 0, 0, 0, 0],
  ["210", "soz", "\"lom\"", "", null, 0, 0, 0, 0, 0, 0],
  ["211", "soz", "harflarining", "", null, 0, 0, 0, 0, 0, 0],
  ["212", "soz", "qalqala", "", null, 0, 0, 0, 0, 0, 0],
  ["213", "soz", "bo'lib", "", null, 0, 0, 0, 0, 0, 0],
  ["214", "soz", "tebranib", "", null, 0, 0, 0, 0, 0, 0],
  ["215", "soz", "qolishi", "", null, 0, 0, 0, 0, 0, 0],
  ["216", "soz", "kabi", "", null, 0, 0, 0, 0, 0, 0],
  ["217", "soz", "sifatlar", "", null, 0, 0, 0, 0, 0, 0],
  ["218", "soz", "va", "", null, 0, 0, 0, 0, 0, 0],
  ["219", "soz", "harakatlarda", "", null, 0, 0, 0, 0, 0, 0],
  ["220", "soz", "lablarning", "", null, 0, 0, 0, 0, 0, 0],
  ["221", "soz", "keragicha", "", null, 0, 0, 0, 0, 0, 0],
  ["222", "soz", "harakatlanmay,", "", null, 0, 0, 0, 0, 0, 0],
  ["223", "soz", "ixtilos", "", null, 0, 0, 0, 0, 0, 0],
  ["224", "soz", "(harakatning", "", null, 0, 0, 0, 0, 0, 0],
  ["225", "soz", "2/3", "", null, 0, 0, 0, 0, 0, 0],
  ["226", "soz", "qismi", "", null, 0, 0, 0, 0, 0, 0],
  ["227", "soz", "yo'qolib,", "", null, 0, 0, 0, 0, 0, 0],
  ["228", "soz", "1/3", "", null, 0, 0, 0, 0, 0, 0],
  ["229", "soz", "qismi", "", null, 0, 0, 0, 0, 0, 0],
  ["230", "soz", "talaffuzda", "", null, 0, 0, 0, 0, 0, 0],
  ["231", "soz", "namoyon)", "", null, 0, 0, 0, 0, 0, 0],
  ["232", "soz", "bo'lishi", "", null, 0, 0, 0, 0, 0, 0],
  ["233", "soz", "kabi", "", null, 0, 0, 0, 0, 0, 0],
  ["234", "soz", "holatlar", "", null, 0, 0, 0, 0, 0, 0],
  ["235", "soz", "yuz", "", null, 0, 0, 0, 0, 0, 0],
  ["236", "soz", "berishida", "", null, 0, 0, 0, 0, 0, 0],
  ["237", "soz", "kuzatiladi.", "", null, 0, 0, 0, 0, 0, 0],
  ["238", "soz", "Shu", "", null, 0, 0, 0, 0, 0, 0],
  ["239", "soz", "jihatlarga", "", null, 0, 0, 0, 0, 0, 0],
  ["240", "soz", "e'tibor", "", null, 0, 0, 0, 0, 0, 0],
  ["241", "soz", "qaratilsa,", "", null, 0, 0, 0, 0, 0, 0],
  ["242", "soz", "ushbu", "", null, 0, 0, 0, 0, 0, 0],
  ["243", "soz", "ilovali", "", null, 0, 0, 0, 0, 0, 0],
  ["244", "soz", "qo'llanma", "", null, 0, 0, 0, 0, 0, 0],
  ["245", "soz", "Qur'oni", "", null, 0, 0, 0, 0, 0, 0],
  ["246", "soz", "karimni", "", null, 0, 0, 0, 0, 0, 0],
  ["247", "soz", "to'g'ri", "", null, 0, 0, 0, 0, 0, 0],
  ["248", "soz", "o'qishni", "", null, 0, 0, 0, 0, 0, 0],
  ["249", "soz", "o'rganishda", "", null, 0, 0, 0, 0, 0, 0],
  ["250", "soz", "yana", "", null, 0, 0, 0, 0, 0, 0],
  ["251", "soz", "bir", "", null, 0, 0, 0, 0, 0, 0],
  ["252", "soz", "muhim", "", null, 0, 0, 0, 0, 0, 0],
  ["253", "soz", "vosita", "", null, 0, 0, 0, 0, 0, 0],
  ["254", "soz", "bo'lib", "", null, 0, 0, 0, 0, 0, 0],
  ["255", "soz", "xizmat", "", null, 0, 0, 0, 0, 0, 0],
  ["256", "soz", "qiladi,", "", null, 0, 0, 0, 0, 0, 0],
  ["257", "soz", "degan", "", null, 0, 0, 0, 0, 0, 0],
  ["258", "soz", "umiddamiz.", "", null, 0, 0, 0, 0, 0, 0],
  ["259", "soz", "Garchi", "", null, 0, 0, 0, 0, 0, 0],
  ["260", "soz", "Qur'oni", "", null, 0, 0, 0, 0, 0, 0],
  ["261", "soz", "karim", "", null, 0, 0, 0, 0, 0, 0],
  ["262", "soz", "kalimalaridan", "", null, 0, 0, 0, 0, 0, 0],
  ["263", "soz", "boshqa", "", null, 0, 0, 0, 0, 0, 0],
  ["264", "soz", "so'zlarni", "", null, 0, 0, 0, 0, 0, 0],
  ["265", "soz", "talaffuz", "", null, 0, 0, 0, 0, 0, 0],
  ["266", "soz", "qilishda", "", null, 0, 0, 0, 0, 0, 0],
  ["267", "soz", "tajvid", "", null, 0, 0, 0, 0, 0, 0],
  ["268", "soz", "qoidalariga", "", null, 0, 0, 0, 0, 0, 0],
  ["269", "soz", "rioya", "", null, 0, 0, 0, 0, 0, 0],
  ["270", "soz", "qilish", "", null, 0, 0, 0, 0, 0, 0],
  ["271", "soz", "vojib", "", null, 0, 0, 0, 0, 0, 0],
  ["272", "soz", "bo'lmasa-da,", "", null, 0, 0, 0, 0, 0, 0],
  ["273", "soz", "maqsad", "", null, 0, 0, 0, 0, 0, 0],
  ["274", "soz", "Qur'oni", "", null, 0, 0, 0, 0, 0, 0],
  ["275", "soz", "karimni", "", null, 0, 0, 0, 0, 0, 0],
  ["276", "soz", "to'g'ri", "", null, 0, 0, 0, 0, 0, 0],
  ["277", "soz", "o'qishga", "", null, 0, 0, 0, 0, 0, 0],
  ["278", "soz", "odatlantirish", "", null, 0, 0, 0, 0, 0, 0],
  ["279", "soz", "bo'lgani", "", null, 0, 0, 0, 0, 0, 0],
  ["280", "soz", "uchun", "", null, 0, 0, 0, 0, 0, 0],
  ["281", "soz", "imon", "", null, 0, 0, 0, 0, 0, 0],
  ["282", "soz", "kalimalari", "", null, 0, 0, 0, 0, 0, 0],
  ["283", "soz", "ham", "", null, 0, 0, 0, 0, 0, 0],
  ["284", "soz", "tajvid", "", null, 0, 0, 0, 0, 0, 0],
  ["285", "soz", "asosida", "", null, 0, 0, 0, 0, 0, 0],
  ["286", "soz", "o'qib", "", null, 0, 0, 0, 0, 0, 0],
  ["287", "soz", "ko'rsatildi.", "", null, 0, 0, 0, 0, 0, 0],
];

// ============================================================
// PAGE 3 — Alifbo: Alphabet grid + harakats + ra
// ============================================================
const p3: ED[] = [
  // Alphabet Row 1 (right to left): ا ب ت ث ج ح خ
  ["01", "harf", "ا", "Alif", A.alifbo, 0, 2, 88, 14, 7, 5],
  ["02", "harf", "ب", "Ba", A.alifbo, 2, 4, 76, 14, 7, 5],
  ["03", "harf", "ت", "Ta", A.alifbo, 4, 6, 64, 14, 7, 5],
  ["04", "harf", "ث", "Tha", A.alifbo, 6, 8, 52, 14, 7, 5],
  ["05", "harf", "ج", "Jim", A.alifbo, 8, 10, 40, 14, 7, 5],
  ["06", "harf", "ح", "Ha", A.alifbo, 10, 12, 28, 14, 7, 5],
  ["07", "harf", "خ", "Xo", A.alifbo, 12, 14, 16, 14, 7, 5],
  // Row 2: د ذ ر ز س ش ص
  ["08", "harf", "د", "Dal", A.alifbo, 14, 16, 88, 22, 7, 5],
  ["09", "harf", "ذ", "Zal", A.alifbo, 16, 18, 76, 22, 7, 5],
  ["10", "harf", "ر", "Ro", A.alifbo, 18, 20, 64, 22, 7, 5],
  ["11", "harf", "ز", "Za", A.alifbo, 20, 22, 52, 22, 7, 5],
  ["12", "harf", "س", "Sin", A.alifbo, 22, 24, 40, 22, 7, 5],
  ["13", "harf", "ش", "Shin", A.alifbo, 24, 26, 28, 22, 7, 5],
  ["14", "harf", "ص", "Sod", A.alifbo, 26, 28, 16, 22, 7, 5],
  // Row 3: ض ط ظ ع غ ف ق
  ["15", "harf", "ض", "Dod", A.alifbo, 28, 30, 88, 30, 7, 5],
  ["16", "harf", "ط", "To", A.alifbo, 30, 32, 76, 30, 7, 5],
  ["17", "harf", "ظ", "Zo", A.alifbo, 32, 34, 64, 30, 7, 5],
  ["18", "harf", "ع", "Ayn", A.alifbo, 34, 36, 52, 30, 7, 5],
  ["19", "harf", "غ", "G'ayn", A.alifbo, 36, 38, 40, 30, 7, 5],
  ["20", "harf", "ف", "Fa", A.alifbo, 38, 40, 28, 30, 7, 5],
  ["21", "harf", "ق", "Qof", A.alifbo, 40, 42, 16, 30, 7, 5],
  // Row 4: ك ل م ن و ه لا ي ة
  ["22", "harf", "ك", "Kaf", A.alifbo, 42, 44, 88, 38, 7, 5],
  ["23", "harf", "ل", "Lam", A.alifbo, 44, 46, 76, 38, 7, 5],
  ["24", "harf", "م", "Mim", A.alifbo, 46, 48, 64, 38, 7, 5],
  ["25", "harf", "ن", "Nun", A.alifbo, 48, 50, 52, 38, 7, 5],
  ["26", "harf", "و", "Vav", A.alifbo, 50, 52, 40, 38, 7, 5],
  ["27", "harf", "ه", "Ha", A.alifbo, 52, 54, 28, 38, 7, 5],
  ["28", "harf", "ي", "Ya", A.alifbo, 56, 58, 16, 38, 7, 5],
  // Harakat section: اَ اِ اُ
  ["29", "harf", "اَ", "Alif fatha", A.harakat, 0, 3, 72, 56, 10, 7],
  ["30", "harf", "اِ", "Alif kasra", A.harakat, 3, 6, 44, 56, 10, 7],
  ["31", "harf", "اُ", "Alif damma", A.harakat, 6, 9, 16, 56, 10, 7],
  // Ra with harakats: رَ رِ رُ
  ["32", "harf", "رَ", "Ra fatha", A.ro, 0, 2, 72, 69, 10, 7],
  ["33", "harf", "رِ", "Ra kasra", A.ro, 2, 4, 44, 69, 10, 7],
  ["34", "harf", "رُ", "Ra damma", A.ro, 4, 6, 16, 69, 10, 7],
  // Combined: اَرْ اِرْ اُرْ
  ["35", "bogin", "اَرْ", "Ar", A.ro, 6, 9, 72, 82, 10, 7],
  ["36", "bogin", "اِرْ", "Ir", A.ro, 9, 12, 44, 82, 10, 7],
  ["37", "bogin", "اُرْ", "Ur", A.ro, 12, 15, 16, 82, 10, 7],
];

// ============================================================
// PAGE 4 — Alifbo continued (same layout, review)
// ============================================================
const p4: ED[] = [
  // Same alphabet - create elements for harakat section only (review)
  ["01", "harf", "اَ", "Alif fatha", A.harakat, 0, 3, 72, 56, 10, 7],
  ["02", "harf", "اِ", "Alif kasra", A.harakat, 3, 6, 44, 56, 10, 7],
  ["03", "harf", "اُ", "Alif damma", A.harakat, 6, 9, 16, 56, 10, 7],
  ["04", "harf", "رَ", "Ra fatha", A.ro, 0, 2, 72, 69, 10, 7],
  ["05", "harf", "رِ", "Ra kasra", A.ro, 2, 4, 44, 69, 10, 7],
  ["06", "harf", "رُ", "Ra damma", A.ro, 4, 6, 16, 69, 10, 7],
];

// ============================================================
// PAGE 5 — Ro continuation + Nun + Ya
// ============================================================
const p5: ED[] = [
  // Top: Ro words continuation
  ["01", "soz", "زُرْتُ", "Ziyorat qildim", A.ro, 15, 18, 82, 4, 14, 5],
  ["02", "soz", "اَمَرْتُ", "Buyurdim", A.ro, 18, 21, 62, 4, 16, 5],
  ["03", "soz", "مَرَرْتُ", "O'tdim", A.ro, 21, 24, 40, 4, 16, 5],
  // Nun section header: نَ نِ نُ
  ["04", "harf", "نَ", "Nun fatha", A.na, 0, 2, 72, 28, 10, 6],
  ["05", "harf", "نِ", "Nun kasra", A.na, 2, 4, 44, 28, 10, 6],
  ["06", "harf", "نُ", "Nun damma", A.na, 4, 6, 16, 28, 10, 6],
  // Nun words
  ["07", "bogin", "اَنْ", "An", A.na, 6, 8, 82, 35, 10, 5],
  ["08", "bogin", "اِنْ", "In", A.na, 8, 10, 68, 35, 10, 5],
  ["09", "bogin", "مَنْ", "Man", A.na, 10, 12, 44, 35, 10, 5],
  ["10", "soz", "اَنْتَ", "Anta (sen)", A.na, 14, 17, 82, 42, 14, 5],
  ["11", "soz", "نِعْمَتْ", "Ne'mat", A.na, 17, 20, 56, 42, 16, 5],
  // Ya section header: يَ يِ يُ
  ["12", "harf", "يَ", "Ya fatha", A.ya, 0, 2, 72, 59, 10, 6],
  ["13", "harf", "يِ", "Ya kasra", A.ya, 2, 4, 44, 59, 10, 6],
  ["14", "harf", "يُ", "Ya damma", A.ya, 4, 6, 16, 59, 10, 6],
  // Ya words
  ["15", "soz", "زَيْتْ", "Zayt (yog')", A.ya, 10, 13, 62, 67, 14, 5],
  ["16", "soz", "مَيِّتْ", "Mayyit", A.ya, 13, 16, 40, 67, 14, 5],
  ["17", "soz", "يَمَنْ", "Yaman", A.ya, 20, 23, 82, 77, 14, 5],
  ["18", "soz", "مَرْيَمْ", "Maryam", A.ya, 23, 26, 60, 77, 16, 5],
];

// ============================================================
// PAGE 6 — Ba + Kaf
// ============================================================
const p6: ED[] = [
  // Ba section header
  ["01", "harf", "بَ", "Ba fatha", A.ba, 0, 2, 72, 4, 10, 6],
  ["02", "harf", "بِ", "Ba kasra", A.ba, 2, 4, 44, 4, 10, 6],
  ["03", "harf", "بُ", "Ba damma", A.ba, 4, 6, 16, 4, 10, 6],
  // Ba words
  ["04", "soz", "اَبْ", "Ota", A.ba, 6, 9, 82, 12, 10, 5],
  ["05", "soz", "اِبْنْ", "O'g'il", A.ba, 9, 12, 68, 12, 12, 5],
  ["06", "soz", "بِنْتُ", "Qiz", A.ba, 12, 15, 54, 12, 12, 5],
  ["07", "soz", "بَيْتُ", "Uy", A.ba, 15, 18, 40, 12, 12, 5],
  ["08", "soz", "زَيْنَبْ", "Zaynab", A.ba, 20, 23, 82, 20, 14, 5],
  ["09", "soz", "بَرْبَرْ", "Barbar", A.ba, 23, 26, 62, 20, 16, 5],
  // Kaf section header
  ["10", "harf", "كَ", "Kaf fatha", A.ka, 0, 2, 72, 46, 10, 6],
  ["11", "harf", "كِ", "Kaf kasra", A.ka, 2, 4, 44, 46, 10, 6],
  ["12", "harf", "كُ", "Kaf damma", A.ka, 4, 6, 16, 46, 10, 6],
  // Kaf words
  ["13", "soz", "كَمْ", "Qancha", A.ka, 6, 9, 82, 55, 10, 5],
  ["14", "soz", "كُنْ", "Bo'l", A.ka, 9, 12, 56, 55, 10, 5],
  ["15", "soz", "كَرَمْ", "Saxovat", A.ka, 14, 17, 56, 65, 14, 5],
  ["16", "soz", "كَنْزْ", "Xazina", A.ka, 17, 20, 40, 65, 14, 5],
  ["17", "soz", "كَتَبَ", "Yozdi", A.ka, 22, 25, 82, 76, 14, 5],
  ["18", "soz", "يَكْتُبُ", "Yozadi", A.ka, 25, 28, 62, 76, 16, 5],
  ["19", "soz", "تَرَكَ", "Tark qildi", A.ka, 28, 31, 44, 76, 14, 5],
];

// ============================================================
// PAGE 7 — Lam + Vav
// ============================================================
const p7: ED[] = [
  // Lam section
  ["01", "harf", "لَ", "Lam fatha", A.la, 0, 2, 72, 4, 10, 6],
  ["02", "harf", "لِ", "Lam kasra", A.la, 2, 4, 44, 4, 10, 6],
  ["03", "harf", "لُ", "Lam damma", A.la, 4, 6, 16, 4, 10, 6],
  ["04", "bogin", "اَلْ", "Al", A.la, 6, 8, 82, 12, 10, 5],
  ["05", "bogin", "بَلْ", "Bal", A.la, 8, 10, 68, 12, 10, 5],
  ["06", "bogin", "لَمْ", "Lam", A.la, 10, 12, 54, 12, 10, 5],
  ["07", "soz", "نَزَلَ", "Tushdi", A.la, 16, 19, 82, 22, 14, 5],
  ["08", "soz", "كَمَلَ", "Tugatdi", A.la, 19, 22, 56, 22, 14, 5],
  ["09", "soz", "اَنْزَلَ", "Tushirdi", A.la, 22, 25, 36, 22, 16, 5],
  ["10", "soz", "بُلْبُلْ", "Bulbul", A.la, 30, 33, 82, 38, 16, 5],
  // Vav section
  ["11", "harf", "وَ", "Vav fatha", A.va, 0, 2, 72, 50, 10, 6],
  ["12", "harf", "وِ", "Vav kasra", A.va, 2, 4, 44, 50, 10, 6],
  ["13", "harf", "وُ", "Vav damma", A.va, 4, 6, 16, 50, 10, 6],
  ["14", "soz", "وَرَمْ", "Shish", A.va, 10, 13, 82, 62, 14, 5],
  ["15", "soz", "وَتَرْ", "Vatir", A.va, 13, 16, 62, 62, 14, 5],
  ["16", "soz", "اَوَّلْ", "Avval", A.va, 20, 23, 82, 73, 14, 5],
  ["17", "soz", "يَوْمُ", "Kun", A.va, 23, 26, 62, 73, 14, 5],
  ["18", "soz", "كَوْكَبْ", "Yulduz", A.va, 30, 33, 82, 84, 16, 5],
];

// ============================================================
// PAGE 8 — Ha (ه) + Fa
// ============================================================
const p8: ED[] = [
  // Ha section
  ["01", "harf", "هَ", "Ha fatha", A.ha5, 0, 2, 72, 4, 10, 6],
  ["02", "harf", "هِ", "Ha kasra", A.ha5, 2, 4, 44, 4, 10, 6],
  ["03", "harf", "هُ", "Ha damma", A.ha5, 4, 6, 16, 4, 10, 6],
  ["04", "soz", "هَبْ", "Ber", A.ha5, 6, 9, 82, 12, 10, 5],
  ["05", "soz", "هَمْ", "Ham", A.ha5, 9, 12, 68, 12, 10, 5],
  ["06", "soz", "وَهَبْ", "Berdi", A.ha5, 14, 17, 68, 22, 14, 5],
  ["07", "soz", "لَهَبْ", "Olov", A.ha5, 17, 20, 48, 22, 14, 5],
  ["08", "soz", "مِنْهُ", "Undan", A.ha5, 24, 27, 82, 32, 14, 5],
  ["09", "soz", "اَمْهِلْهُمْ", "Muhlat ber", A.ha5, 30, 34, 16, 32, 22, 5],
  // Fa section
  ["10", "harf", "فَ", "Fa fatha", A.fa, 0, 2, 72, 50, 10, 6],
  ["11", "harf", "فِ", "Fa kasra", A.fa, 2, 4, 44, 50, 10, 6],
  ["12", "harf", "فُ", "Fa damma", A.fa, 4, 6, 16, 50, 10, 6],
  ["13", "soz", "فَمْ", "Og'iz", A.fa, 6, 9, 82, 58, 10, 5],
  ["14", "soz", "فَنْ", "Fan", A.fa, 9, 12, 68, 58, 10, 5],
  ["15", "soz", "كَفَنْ", "Kafan", A.fa, 14, 17, 48, 58, 14, 5],
  ["16", "soz", "فَهْمَ", "Fahmlamoq", A.fa, 20, 23, 56, 69, 14, 5],
  ["17", "soz", "فِكْرَ", "Fikr", A.fa, 23, 26, 40, 69, 14, 5],
  ["18", "soz", "فُلْفُلْ", "Murch", A.fa, 30, 33, 82, 79, 16, 5],
];

// ============================================================
// PAGE 9 — Qof + Shin
// ============================================================
const p9: ED[] = [
  // Qof section
  ["01", "harf", "قَ", "Qof fatha", A.qo, 0, 2, 72, 4, 10, 6],
  ["02", "harf", "قِ", "Qof kasra", A.qo, 2, 4, 44, 4, 10, 6],
  ["03", "harf", "قُ", "Qof damma", A.qo, 4, 6, 16, 4, 10, 6],
  ["04", "soz", "قَلْبْ", "Yurak", A.qo, 10, 13, 82, 18, 14, 5],
  ["05", "soz", "قَبْلَ", "Oldin", A.qo, 13, 16, 64, 18, 14, 5],
  ["06", "soz", "قَلَمْ", "Qalam", A.qo, 18, 21, 40, 18, 14, 5],
  ["07", "soz", "قَمَرْ", "Oy", A.qo, 21, 24, 24, 18, 14, 5],
  // Shin section
  ["08", "harf", "شَ", "Shin fatha", A.sha, 0, 2, 72, 50, 10, 6],
  ["09", "harf", "شِ", "Shin kasra", A.sha, 2, 4, 44, 50, 10, 6],
  ["10", "harf", "شُ", "Shin damma", A.sha, 4, 6, 16, 50, 10, 6],
  ["11", "soz", "شَهْرْ", "Oy (vaqt)", A.sha, 12, 15, 48, 62, 14, 5],
  ["12", "soz", "نَشْرْ", "Nashr", A.sha, 15, 18, 32, 62, 14, 5],
  ["13", "soz", "شُكْرْ", "Shukr", A.sha, 18, 21, 64, 62, 14, 5],
  ["14", "soz", "مَشْرَبْ", "Ichimlik", A.sha, 24, 27, 82, 72, 16, 5],
  ["15", "soz", "مُشْتَرَكْ", "Umumiy", A.sha, 30, 34, 16, 72, 20, 5],
];

// ============================================================
// PAGE 10 — Sin + Tha
// ============================================================
const p10: ED[] = [
  // Sin section
  ["01", "harf", "سَ", "Sin fatha", A.sin, 0, 2, 72, 4, 10, 6],
  ["02", "harf", "سِ", "Sin kasra", A.sin, 2, 4, 44, 4, 10, 6],
  ["03", "harf", "سُ", "Sin damma", A.sin, 4, 6, 16, 4, 10, 6],
  ["04", "soz", "سَفَرْ", "Safar", A.sin, 10, 13, 82, 18, 14, 5],
  ["05", "soz", "سَمَكْ", "Baliq", A.sin, 16, 19, 34, 18, 14, 5],
  ["06", "soz", "مُسْلِمْ", "Muslim", A.sin, 22, 25, 54, 27, 16, 5],
  ["07", "soz", "اَسْلَمَ", "Islomga kirdi", A.sin, 28, 31, 82, 36, 16, 5],
  // Tha section
  ["08", "harf", "ثَ", "Tha fatha", A.tho, 0, 2, 72, 50, 10, 6],
  ["09", "harf", "ثِ", "Tha kasra", A.tho, 2, 4, 44, 50, 10, 6],
  ["10", "harf", "ثُ", "Tha damma", A.tho, 4, 6, 16, 50, 10, 6],
  ["11", "soz", "ثَمَرْ", "Meva", A.tho, 8, 11, 54, 58, 14, 5],
  ["12", "soz", "ثَمَنْ", "Narx", A.tho, 11, 14, 34, 58, 14, 5],
  ["13", "soz", "ثَوْبْ", "Kiyim", A.tho, 16, 19, 64, 67, 14, 5],
  ["14", "soz", "مَثَلْ", "Masalan", A.tho, 19, 22, 34, 67, 14, 5],
  ["15", "soz", "كَوْثَرْ", "Kavsar", A.tho, 24, 27, 82, 77, 16, 5],
];

// ============================================================
// PAGE 11 — Sod + To
// ============================================================
const p11: ED[] = [
  // Sod section
  ["01", "harf", "صَ", "Sod fatha", A.sod, 0, 2, 72, 4, 10, 6],
  ["02", "harf", "صِ", "Sod kasra", A.sod, 2, 4, 44, 4, 10, 6],
  ["03", "harf", "صُ", "Sod damma", A.sod, 4, 6, 16, 4, 10, 6],
  ["04", "soz", "صَبْرْ", "Sabr", A.sod, 8, 11, 48, 10, 14, 5],
  ["05", "soz", "بَصَرْ", "Ko'rish", A.sod, 11, 14, 32, 10, 14, 5],
  ["06", "soz", "نَصَرَ", "Yordam berdi", A.sod, 18, 21, 82, 20, 14, 5],
  ["07", "soz", "يَنْصُرُ", "Yordam beradi", A.sod, 21, 24, 62, 20, 18, 5],
  // To section
  ["08", "harf", "طَ", "To fatha", A.to, 0, 2, 72, 44, 10, 6],
  ["09", "harf", "طِ", "To kasra", A.to, 2, 4, 44, 44, 10, 6],
  ["10", "harf", "طُ", "To damma", A.to, 4, 6, 16, 44, 10, 6],
  ["11", "soz", "طَلَبَ", "Izladi", A.to, 10, 13, 64, 58, 14, 5],
  ["12", "soz", "طِفْلْ", "Bola", A.to, 13, 16, 34, 58, 14, 5],
  ["13", "soz", "وَطَنْ", "Vatan", A.to, 16, 19, 82, 58, 14, 5],
  ["14", "soz", "مَطْلَبْ", "Maqsad", A.to, 22, 25, 82, 72, 16, 5],
  ["15", "soz", "مُسْقَطْ", "Musqat", A.to, 25, 28, 56, 72, 16, 5],
];

// ============================================================
// PAGE 12 — Jim + Xo
// ============================================================
const p12: ED[] = [
  // Jim section
  ["01", "harf", "جَ", "Jim fatha", A.jim, 0, 2, 72, 4, 10, 6],
  ["02", "harf", "جِ", "Jim kasra", A.jim, 2, 4, 44, 4, 10, 6],
  ["03", "harf", "جُ", "Jim damma", A.jim, 4, 6, 16, 4, 10, 6],
  ["04", "soz", "جَبَلْ", "Tog'", A.jim, 10, 13, 82, 18, 14, 5],
  ["05", "soz", "جَمَلْ", "Tuya", A.jim, 13, 16, 64, 18, 14, 5],
  ["06", "soz", "فَجْرْ", "Tong", A.jim, 16, 19, 44, 18, 14, 5],
  ["07", "soz", "جَوْهَرْ", "Javhar", A.jim, 19, 22, 24, 18, 16, 5],
  // Xo section
  ["08", "harf", "خَ", "Xo fatha", A.xo, 0, 2, 72, 48, 10, 6],
  ["09", "harf", "خِ", "Xo kasra", A.xo, 2, 4, 44, 48, 10, 6],
  ["10", "harf", "خُ", "Xo damma", A.xo, 4, 6, 16, 48, 10, 6],
  ["11", "soz", "خَبَرْ", "Xabar", A.xo, 10, 13, 48, 57, 14, 5],
  ["12", "soz", "خَشَبْ", "Yog'och", A.xo, 13, 16, 30, 57, 14, 5],
  ["13", "soz", "خَيْرْ", "Yaxshilik", A.xo, 18, 21, 82, 67, 14, 5],
  ["14", "soz", "خَوْفْ", "Qo'rquv", A.xo, 21, 24, 54, 67, 14, 5],
  ["15", "soz", "مَخْرَجْ", "Chiqish", A.xo, 24, 27, 38, 67, 16, 5],
];

// ============================================================
// PAGE 13 — Ha (ح) + G'ayn
// ============================================================
const p13: ED[] = [
  // Ha section
  ["01", "harf", "حَ", "Ha fatha", A.ha, 0, 2, 72, 4, 10, 6],
  ["02", "harf", "حِ", "Ha kasra", A.ha, 2, 4, 44, 4, 10, 6],
  ["03", "harf", "حُ", "Ha damma", A.ha, 4, 6, 16, 4, 10, 6],
  ["04", "soz", "حَجْ", "Haj", A.ha, 8, 11, 64, 12, 10, 5],
  ["05", "soz", "حَسَنْ", "Hasan", A.ha, 11, 14, 44, 12, 14, 5],
  ["06", "soz", "مُحْسِنْ", "Muhsin", A.ha, 16, 19, 82, 22, 16, 5],
  ["07", "soz", "اَحْسَنَ", "Yaxshiladi", A.ha, 19, 22, 16, 22, 16, 5],
  ["08", "soz", "اِمْتَحَنَ", "Sinadi", A.ha, 25, 28, 82, 32, 18, 5],
  // G'ayn section
  ["09", "harf", "غَ", "G'ayn fatha", A.gho, 0, 2, 72, 52, 10, 6],
  ["10", "harf", "غِ", "G'ayn kasra", A.gho, 2, 4, 44, 52, 10, 6],
  ["11", "harf", "غُ", "G'ayn damma", A.gho, 4, 6, 16, 52, 10, 6],
  ["12", "soz", "غَمْ", "G'am", A.gho, 6, 9, 82, 62, 10, 5],
  ["13", "soz", "غَيْرْ", "Boshqa", A.gho, 11, 14, 40, 62, 14, 5],
  ["14", "soz", "مَبْلَغْ", "Summa", A.gho, 16, 19, 62, 72, 16, 5],
  ["15", "soz", "مَغْرِبْ", "Mag'rib", A.gho, 19, 22, 44, 72, 16, 5],
  ["16", "soz", "اِسْتَغْفَرَ", "Istig'for qildi", A.gho, 28, 32, 44, 82, 22, 5],
];

// ============================================================
// PAGE 14 — Ayn + Dal
// ============================================================
const p14: ED[] = [
  // Ayn section
  ["01", "harf", "عَ", "Ayn fatha", A.ayn, 0, 2, 72, 4, 10, 6],
  ["02", "harf", "عِ", "Ayn kasra", A.ayn, 2, 4, 44, 4, 10, 6],
  ["03", "harf", "عُ", "Ayn damma", A.ayn, 4, 6, 16, 4, 10, 6],
  ["04", "soz", "عَرَبْ", "Arab", A.ayn, 8, 11, 30, 12, 14, 5],
  ["05", "soz", "عَجَبْ", "Ajablanish", A.ayn, 14, 17, 82, 22, 14, 5],
  ["06", "soz", "عَمَلْ", "Amal", A.ayn, 17, 20, 64, 22, 14, 5],
  ["07", "soz", "عِلْمُ", "Ilm", A.ayn, 20, 23, 46, 22, 14, 5],
  ["08", "soz", "عُمَرْ", "Umar", A.ayn, 23, 26, 28, 22, 14, 5],
  // Dal section
  ["09", "harf", "دَ", "Dal fatha", A.dal, 0, 2, 72, 52, 10, 6],
  ["10", "harf", "دِ", "Dal kasra", A.dal, 2, 4, 44, 52, 10, 6],
  ["11", "harf", "دُ", "Dal damma", A.dal, 4, 6, 16, 52, 10, 6],
  ["12", "soz", "دَرَسَ", "O'qidi", A.dal, 10, 13, 82, 65, 14, 5],
  ["13", "soz", "دَفَعَ", "Itardi", A.dal, 13, 16, 62, 65, 14, 5],
  ["14", "soz", "دَهْرْ", "Davr", A.dal, 18, 21, 24, 65, 14, 5],
  ["15", "soz", "اِعْتَدَلَ", "Tekislandi", A.dal, 28, 32, 82, 82, 20, 5],
];

// ============================================================
// PAGE 15 — Dod (ض) + Zal (ذ)
// ============================================================
const p15: ED[] = [
  // Dod section
  ["01", "harf", "ضَ", "Dod fatha", A.dod, 0, 2, 72, 4, 10, 6],
  ["02", "harf", "ضِ", "Dod kasra", A.dod, 2, 4, 44, 4, 10, 6],
  ["03", "harf", "ضُ", "Dod damma", A.dod, 4, 6, 16, 4, 10, 6],
  ["04", "soz", "ضَيْفْ", "Mehmon", A.dod, 6, 9, 82, 12, 14, 5],
  ["05", "soz", "ضَعْفْ", "Zaiflik", A.dod, 9, 12, 44, 12, 14, 5],
  ["06", "soz", "عَرَضْ", "Ko'rsatdi", A.dod, 12, 15, 16, 12, 14, 5],
  ["07", "soz", "مَضْرَبْ", "Urish joyi", A.dod, 18, 21, 82, 22, 16, 5],
  // Zal section
  ["08", "harf", "ذَ", "Zal fatha", A.zol, 0, 2, 72, 50, 10, 6],
  ["09", "harf", "ذِ", "Zal kasra", A.zol, 2, 4, 44, 50, 10, 6],
  ["10", "harf", "ذُ", "Zal damma", A.zol, 4, 6, 16, 50, 10, 6],
  ["11", "soz", "ذَهَبَ", "Ketdi/Oltin", A.zol, 10, 13, 40, 64, 14, 5],
  ["12", "soz", "مَذْهَبْ", "Mazhab", A.zol, 13, 16, 16, 64, 16, 5],
  ["13", "soz", "بَذَلَ", "Sarfladi", A.zol, 18, 21, 54, 75, 14, 5],
  ["14", "soz", "يَذْهَبُ", "Ketadi", A.zol, 24, 27, 16, 75, 18, 5],
];

// ============================================================
// PAGE 16 — Zo (ظ) + explanation text
// ============================================================
const p16: ED[] = [
  // Zo section
  ["01", "harf", "ظَ", "Zo fatha", A.zho, 0, 2, 72, 4, 10, 6],
  ["02", "harf", "ظِ", "Zo kasra", A.zho, 2, 4, 44, 4, 10, 6],
  ["03", "harf", "ظُ", "Zo damma", A.zho, 4, 6, 16, 4, 10, 6],
  ["04", "soz", "ظَنْ", "Gumon", A.zho, 6, 9, 82, 12, 10, 5],
  ["05", "soz", "ظُلْمْ", "Zulm", A.zho, 9, 12, 56, 12, 12, 5],
  ["06", "soz", "نَظَرَ", "Qaradi", A.zho, 14, 17, 62, 24, 14, 5],
  ["07", "soz", "حَظَرَ", "Taqiqladi", A.zho, 17, 20, 42, 24, 14, 5],
  ["08", "soz", "مُظْهِرْ", "Ko'rsatuvchi", A.zho, 24, 27, 64, 38, 16, 5],
  ["09", "soz", "مُظْلِمْ", "Qorong'i", A.zho, 27, 30, 16, 38, 16, 5],
  ["10", "soz", "اِنْتَظَمَ", "Tartibga tushdi", A.zho, 34, 38, 82, 48, 20, 5],
  ["11", "soz", "اِسْتَعْظَمَ", "Ulug'ladi", A.zho, 38, 42, 44, 48, 22, 5],
];

// ============================================================
// PAGE 17 — Madlar (Long Vowels) grid
// ============================================================
const p17: ED[] = [
  // Title row - long vowel letters
  ["01", "harf", "آ", "Alif mad", A.mad1, 0, 3, 72, 10, 10, 6],
  ["02", "harf", "ي", "Ya mad", A.mad1, 3, 6, 44, 10, 10, 6],
  ["03", "harf", "و", "Vav mad", A.mad1, 6, 9, 16, 10, 10, 6],
  // Row examples with Alif
  ["04", "bogin", "بَا", "Baa", A.mad1, 9, 11, 56, 20, 10, 5],
  ["05", "bogin", "تَا", "Taa", A.mad1, 11, 13, 24, 20, 10, 5],
  // Row with Ya
  ["06", "bogin", "بِي", "Bii", A.mad1, 15, 17, 56, 20, 10, 5],
  ["07", "bogin", "تِي", "Tii", A.mad1, 17, 19, 24, 20, 10, 5],
  // Row with Vav
  ["08", "bogin", "بُو", "Buu", A.mad1, 21, 23, 56, 20, 10, 5],
  ["09", "bogin", "تُو", "Tuu", A.mad1, 23, 25, 24, 20, 10, 5],
  // Selected grid entries
  ["10", "bogin", "شَا", "Shaa", A.mad1, 30, 32, 24, 47, 10, 5],
  ["11", "bogin", "ظَا", "Zaa", A.mad1, 34, 36, 24, 55, 10, 5],
  ["12", "bogin", "يَا", "Yaa", A.mad1, 40, 42, 82, 87, 10, 5],
];

// ============================================================
// PAGE 18 — Madlar continued (different combos)
// ============================================================
const p18: ED[] = [
  // Grid of 2-letter mad combinations
  ["01", "bogin", "بُو", "Buu", A.mad2, 0, 2, 72, 8, 10, 5],
  ["02", "bogin", "يِي", "Yii", A.mad2, 2, 4, 44, 8, 10, 5],
  ["03", "bogin", "بَا", "Baa", A.mad2, 4, 6, 16, 8, 10, 5],
  ["04", "bogin", "هُو", "Huu", A.mad2, 8, 10, 72, 17, 10, 5],
  ["05", "bogin", "تِي", "Tii", A.mad2, 10, 12, 44, 17, 10, 5],
  ["06", "bogin", "هَا", "Haa", A.mad2, 12, 14, 16, 17, 10, 5],
  ["07", "bogin", "قُو", "Quu", A.mad2, 18, 20, 72, 55, 10, 5],
  ["08", "bogin", "ذِي", "Zii", A.mad2, 20, 22, 44, 55, 10, 5],
  ["09", "bogin", "قَا", "Qaa", A.mad2, 22, 24, 16, 55, 10, 5],
];

// ============================================================
// PAGE 19 — Madlar words
// ============================================================
const p19: ED[] = [
  ["01", "soz", "مَالْ", "Mol-mulk", A.mad1, 44, 47, 82, 4, 12, 5],
  ["02", "soz", "حَالْ", "Hol-ahvol", A.mad1, 47, 50, 68, 4, 12, 5],
  ["03", "soz", "نَارْ", "Olov", A.mad1, 50, 53, 54, 4, 12, 5],
  ["04", "soz", "كَلَامْ", "Kalom", A.mad1, 56, 59, 82, 18, 14, 5],
  ["05", "soz", "سَلَامْ", "Salom", A.mad1, 59, 62, 64, 18, 14, 5],
  ["06", "soz", "حَرَامْ", "Harom", A.mad1, 62, 65, 44, 18, 14, 5],
  ["07", "soz", "اِمَامْ", "Imom", A.mad1, 68, 71, 82, 26, 14, 5],
  ["08", "soz", "عَالِمْ", "Olim", A.mad1, 74, 77, 82, 56, 14, 5],
  ["09", "soz", "صَابِرْ", "Sabr qiluvchi", A.mad1, 77, 80, 62, 56, 14, 5],
  ["10", "soz", "يُقَالُ", "Aytiladi", A.mad2, 30, 33, 82, 64, 14, 5],
];

// ============================================================
// PAGE 20 — Madlar words continued
// ============================================================
const p20: ED[] = [
  ["01", "soz", "يَشْهَدُونَ", "Guvohlik beradilar", A.mad2, 34, 38, 82, 4, 22, 5],
  ["02", "soz", "يَرْجِعُونَ", "Qaytadilar", A.mad2, 38, 42, 48, 4, 22, 5],
  ["03", "soz", "يُكْرِمُونَ", "Hurmat qiladilar", A.mad2, 44, 48, 82, 12, 22, 5],
  ["04", "soz", "تَسْلِمُونَ", "Salom berasizlar", A.mad2, 48, 52, 48, 12, 22, 5],
  ["05", "soz", "مُسْلِمَانِ", "Ikki muslim", A.mad2, 56, 60, 54, 50, 22, 5],
  ["06", "soz", "مُكْرِمَانِ", "Ikki hurmatli", A.mad2, 60, 64, 82, 50, 22, 5],
  ["07", "soz", "مُسْلِمُونَ", "Musulmonlar", A.mad2, 66, 70, 82, 60, 22, 5],
  ["08", "soz", "كَرِيمْ", "Saxiy", A.mad2, 76, 79, 82, 82, 14, 5],
  ["09", "soz", "عَلِيمْ", "Biluvchi", A.mad2, 79, 82, 62, 82, 14, 5],
  ["10", "soz", "حَكِيمْ", "Donolik", A.mad2, 82, 85, 16, 82, 14, 5],
];

// ============================================================
// PAGE 21 — Madlar end + Tashdid start
// ============================================================
const p21: ED[] = [
  // Top: madlar continuation words
  ["01", "soz", "تَعْلِيمْ", "Ta'lim", A.mad2, 86, 89, 82, 4, 16, 5],
  ["02", "soz", "تَدْرِيسْ", "Tadris", A.mad2, 89, 92, 54, 4, 16, 5],
  ["03", "soz", "تَحْسِينْ", "Yaxshilash", A.mad2, 92, 95, 16, 4, 16, 5],
  // Tashdid section header
  ["04", "jumla", "تشدیدلی حرفلر", "Tashdiidli harflar", A.tash, 0, 4, 44, 38, 30, 5],
  // Tashdid examples
  ["05", "soz", "رَبَّ", "Rabb", A.tash, 6, 9, 82, 55, 12, 5],
  ["06", "soz", "اِنَّ", "Albatta", A.tash, 9, 12, 82, 62, 12, 5],
  ["07", "soz", "حَجَّ", "Haj qildi", A.tash, 12, 15, 40, 62, 12, 5],
  ["08", "soz", "شَكَّ", "Shubha qildi", A.tash, 15, 18, 16, 62, 14, 5],
  ["09", "soz", "حَقَّ", "Haq", A.tash, 20, 23, 40, 72, 12, 5],
  ["10", "soz", "ذَمَّ", "Aybadi", A.tash, 23, 26, 54, 72, 12, 5],
];

// ============================================================
// PAGE 22 — Tashdid continued
// ============================================================
const p22: ED[] = [
  ["01", "soz", "بَرَّ", "Yaxshilik qildi", A.tash, 28, 31, 82, 6, 12, 5],
  ["02", "soz", "جَرَّ", "Tortdi", A.tash, 31, 34, 56, 6, 12, 5],
  ["03", "soz", "سِتَّ", "Olti", A.tash, 36, 39, 82, 14, 12, 5],
  ["04", "soz", "عِزَّ", "Izzat", A.tash, 39, 42, 56, 14, 12, 5],
  ["05", "soz", "طِلَّ", "Soya", A.tash, 42, 45, 40, 14, 12, 5],
  ["06", "soz", "حِلَّ", "Halol bo'ldi", A.tash, 45, 48, 24, 14, 12, 5],
  ["07", "soz", "تَوَطَّرَ", "Taravvuh", A.tash, 50, 54, 82, 32, 18, 5],
  ["08", "soz", "تَنَعَّمَ", "Huzurda bo'ldi", A.tash, 54, 58, 54, 32, 18, 5],
  ["09", "soz", "تَفَكَّرَ", "Fikrladi", A.tash, 58, 62, 20, 32, 18, 5],
  ["10", "soz", "مُتَدَبِّرْ", "Fikr qiluvchi", A.tash, 64, 68, 82, 42, 20, 5],
  ["11", "soz", "اِسْوَدَّ", "Qoraydi", A.tash, 72, 75, 82, 60, 18, 5],
  ["12", "soz", "اِحْمَرَّ", "Qizardi", A.tash, 75, 78, 54, 60, 18, 5],
];

// ============================================================
// PAGE 23 — Tashdid end + Tanvin start
// ============================================================
const p23: ED[] = [
  // Tashdid continuation
  ["01", "soz", "مُتَبَدِّلْ", "O'zgaruvchi", A.tash, 80, 84, 82, 5, 20, 5],
  ["02", "soz", "مُتَيَسِّرْ", "Oson bo'lgan", A.tash, 84, 88, 16, 5, 20, 5],
  ["03", "soz", "مُتَوَطِّنْ", "O'rnashgan", A.tash, 88, 92, 82, 14, 20, 5],
  // Tanvin section
  ["04", "jumla", "تنوینلی حرفلر", "Tanvinli harflar", A.tanv, 0, 4, 44, 56, 30, 5],
  // Tanvin forms
  ["05", "harf", "اً", "Fathali tanvin", A.tanv, 6, 9, 72, 80, 10, 6],
  ["06", "harf", "اٍ", "Kasrali tanvin", A.tanv, 9, 12, 44, 80, 10, 6],
  ["07", "harf", "اٌ", "Dammali tanvin", A.tanv, 12, 15, 16, 80, 10, 6],
];

// ============================================================
// PAGE 24 — Tanvin examples
// ============================================================
const p24: ED[] = [
  ["01", "soz", "كِتَابًا", "Kitob (nasb)", A.tanv, 16, 19, 82, 8, 16, 5],
  ["02", "soz", "كِتَابٍ", "Kitob (jarr)", A.tanv, 19, 22, 54, 8, 16, 5],
  ["03", "soz", "كِتَابٌ", "Kitob (raf')", A.tanv, 22, 25, 24, 8, 16, 5],
  ["04", "soz", "رَجُلًا", "Erkak (nasb)", A.tanv, 28, 31, 82, 22, 16, 5],
  ["05", "soz", "رَجُلٍ", "Erkak (jarr)", A.tanv, 31, 34, 54, 22, 16, 5],
  ["06", "soz", "رَجُلٌ", "Erkak (raf')", A.tanv, 34, 37, 24, 22, 16, 5],
  ["07", "soz", "عَلِيمًا", "Biluvchi (nasb)", A.tanv, 40, 43, 82, 44, 18, 5],
  ["08", "soz", "حَكِيمٍ", "Dono (jarr)", A.tanv, 43, 46, 54, 44, 16, 5],
  ["09", "soz", "بَصِيرٌ", "Ko'ruvchi (raf')", A.tanv, 46, 49, 24, 44, 16, 5],
  ["10", "soz", "رَحِيمًا", "Rahimli (nasb)", A.tanv, 52, 55, 82, 64, 18, 5],
  ["11", "soz", "سَمِيعٌ", "Eshituvchi", A.tanv, 55, 58, 24, 64, 18, 5],
];

// ============================================================
// PAGE 25 — Tanvin+Tashdid + Alif Hamza start
// ============================================================
const p25: ED[] = [
  // Tanvin + Tashdid
  ["01", "jumla", "تنوینلی تشدید", "Tanvinli tashdid", A.tantash, 0, 4, 44, 4, 30, 5],
  ["02", "soz", "رَبًّا", "Rabb (nasb)", A.tantash, 6, 9, 82, 16, 14, 5],
  ["03", "soz", "رَبٍّ", "Rabb (jarr)", A.tantash, 9, 12, 54, 16, 14, 5],
  ["04", "soz", "رَبٌّ", "Rabb (raf')", A.tantash, 12, 15, 24, 16, 14, 5],
  ["05", "soz", "حَبًّا", "Sevgi (nasb)", A.tantash, 16, 19, 82, 24, 14, 5],
  ["06", "soz", "مُبَيِّضًا", "Oqartiruvchi", A.tantash, 28, 32, 82, 40, 20, 5],
  ["07", "soz", "مُسْوَدًّا", "Qorayuvchi", A.tantash, 32, 36, 54, 40, 20, 5],
  // Alif va Hamza section
  ["08", "jumla", "الف و همزة", "Alif va Hamza", null, 0, 0, 44, 62, 26, 5],
  ["09", "harf", "ا", "Alif", null, 0, 0, 88, 74, 8, 6],
  ["10", "harf", "أ", "Alif hamza ustida", null, 0, 0, 76, 74, 8, 6],
  ["11", "harf", "إ", "Alif hamza ostida", null, 0, 0, 62, 74, 8, 6],
  ["12", "harf", "ؤ", "Vav hamza", null, 0, 0, 36, 74, 8, 6],
  ["13", "harf", "ئ", "Ya hamza", null, 0, 0, 24, 74, 8, 6],
  ["14", "harf", "ء", "Hamza mustaqil", null, 0, 0, 12, 74, 8, 6],
];

// ============================================================
// PAGE 26 — Alif Hamza examples
// ============================================================
const p26: ED[] = [
  ["01", "soz", "أَمَرَ", "Buyurdi", null, 0, 0, 82, 8, 14, 5],
  ["02", "soz", "أَخَذَ", "Oldi", null, 0, 0, 56, 8, 14, 5],
  ["03", "soz", "قَرَأَ", "O'qidi", null, 0, 0, 30, 8, 14, 5],
  ["04", "soz", "إِذَا", "Qachonki", null, 0, 0, 82, 24, 12, 5],
  ["05", "soz", "إِنَّ", "Albatta", null, 0, 0, 56, 24, 12, 5],
  ["06", "soz", "إِيمَانْ", "Iymon", null, 0, 0, 30, 24, 16, 5],
  ["07", "soz", "سُؤَالْ", "Savol", null, 0, 0, 82, 44, 14, 5],
  ["08", "soz", "رُؤُوسْ", "Boshlar", null, 0, 0, 56, 44, 16, 5],
  ["09", "soz", "مَسْئُولْ", "Mas'ul", null, 0, 0, 82, 60, 18, 5],
  ["10", "soz", "شَيْئًا", "Biror narsa", null, 0, 0, 44, 60, 16, 5],
];

// ============================================================
// PAGE 27-30 — Alif Hamza + Alif Lam continued
// ============================================================
const p27: ED[] = [
  ["01", "soz", "الْكِتَابَ", "Kitob (al)", null, 0, 0, 82, 12, 18, 5],
  ["02", "soz", "الْقُرْآنُ", "Qur'on", null, 0, 0, 50, 12, 18, 5],
  ["03", "soz", "الرَّحْمٰنُ", "Ar-Rahman", null, 0, 0, 82, 32, 20, 5],
  ["04", "soz", "الشَّمْسُ", "Quyosh", null, 0, 0, 50, 32, 18, 5],
  ["05", "soz", "النَّاسُ", "Odamlar", null, 0, 0, 82, 52, 16, 5],
  ["06", "soz", "اللَّهُ", "Alloh", null, 0, 0, 50, 52, 14, 5],
];

const p28: ED[] = [
  ["01", "soz", "الصَّلَاةَ", "Namoz", null, 0, 0, 82, 12, 18, 5],
  ["02", "soz", "الزَّكَاةَ", "Zakot", null, 0, 0, 50, 12, 18, 5],
  ["03", "soz", "الْمُؤْمِنِينَ", "Mo'minlar", null, 0, 0, 82, 36, 24, 5],
  ["04", "soz", "الْمُسْلِمِينَ", "Musulmonlar", null, 0, 0, 40, 36, 24, 5],
  ["05", "soz", "الْحَمْدُ", "Hamd", null, 0, 0, 82, 60, 16, 5],
  ["06", "soz", "لِلَّهِ", "Alloh uchun", null, 0, 0, 56, 60, 14, 5],
];

const p29: ED[] = [
  ["01", "soz", "بِسْمِ اللَّهِ", "Alloh nomi bilan", null, 0, 0, 56, 8, 28, 5],
  ["02", "soz", "الرَّحْمٰنِ", "Rahmon", null, 0, 0, 56, 20, 20, 5],
  ["03", "soz", "الرَّحِيمِ", "Rahim", null, 0, 0, 56, 32, 20, 5],
  ["04", "soz", "إِنَّ اللَّهَ", "Albatta Alloh", null, 0, 0, 56, 52, 24, 5],
];

const p30: ED[] = [
  // Vasl section elements
  ["01", "jumla", "وصل", "Vasl", null, 0, 0, 56, 8, 16, 5],
  ["02", "soz", "اُدْخُلُوا", "Kiringlar", null, 0, 0, 82, 24, 20, 5],
  ["03", "soz", "اِجْتَمَعُوا", "Yig'ildilar", null, 0, 0, 44, 24, 22, 5],
  ["04", "soz", "اِسْتَغْفِرُوا", "Istig'for qiling", null, 0, 0, 82, 44, 24, 5],
  ["05", "soz", "اِهْدِنَا", "Bizni hidoyat qil", null, 0, 0, 44, 44, 18, 5],
];

// ============================================================
// PAGES 31-33 — Vasl, Vaqf, Idg'om
// ============================================================
const p31: ED[] = [
  ["01", "jumla", "وقف", "Vaqf (to'xtash)", null, 0, 0, 56, 8, 16, 5],
  ["02", "soz", "الْعَالَمِينَ", "Olamlar", null, 0, 0, 82, 28, 22, 5],
  ["03", "soz", "الرَّحِيمِ", "Rahim", null, 0, 0, 44, 28, 20, 5],
  ["04", "soz", "يَوْمِ الدِّينِ", "Qiyomat kuni", null, 0, 0, 56, 52, 24, 5],
  ["05", "soz", "الْمُسْتَقِيمَ", "To'g'ri yo'l", null, 0, 0, 56, 72, 24, 5],
];

const p32: ED[] = [
  ["01", "jumla", "إدغام", "Idg'om", null, 0, 0, 56, 8, 18, 5],
  ["02", "soz", "مِنْ نِعْمَةٍ", "Ne'matlardan", null, 0, 0, 82, 28, 22, 5],
  ["03", "soz", "مِنْ رَبِّكَ", "Rabbingdan", null, 0, 0, 44, 28, 20, 5],
  ["04", "soz", "قَدْ تَبَيَّنَ", "Ayon bo'ldi", null, 0, 0, 56, 52, 22, 5],
  ["05", "soz", "يَوْمَئِذٍ", "O'sha kuni", null, 0, 0, 56, 72, 20, 5],
];

const p33: ED[] = [
  ["01", "soz", "إِخْفَاء", "Ixfo (yashirish)", null, 0, 0, 56, 12, 18, 5],
  ["02", "soz", "إِقْلَاب", "Iqlab (almashtirish)", null, 0, 0, 56, 32, 18, 5],
  ["03", "soz", "إِظْهَار", "Izhhor (ochiq aytish)", null, 0, 0, 56, 52, 18, 5],
  ["04", "soz", "غُنَّة", "G'unna (burun ovozi)", null, 0, 0, 56, 72, 16, 5],
];

// ============================================================
// PAGES 34-35 — Kalimalar (Islamic declarations)
// ============================================================
const p34: ED[] = [
  ["01", "jumla", "كَلِمَاتُ إِيمَانِ", "Iymon kalimalari", null, 0, 0, 50, 3, 30, 5],
  ["02", "jumla", "لَا إِلٰهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ", "Kalima Tayyiba", null, 0, 0, 50, 10, 60, 6],
  ["03", "jumla", "أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللَّهُ", "Kalima Shahoda (1-qism)", null, 0, 0, 50, 20, 60, 6],
  ["04", "jumla", "وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ", "Kalima Shahoda (2-qism)", null, 0, 0, 50, 26, 60, 6],
  ["05", "jumla", "كَلِمَةُ التَّوْحِيدِ", "Kalima Tavhid", null, 0, 0, 50, 34, 28, 5],
  ["06", "jumla", "أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", "Tavhid kalimasining boshi", null, 0, 0, 50, 40, 60, 6],
  ["07", "jumla", "كَلِمَةُ رَدِّ الْكُفْرِ", "Kufr rad kalimasi", null, 0, 0, 50, 60, 30, 5],
  ["08", "jumla", "كَلِمَةُ الِاسْتِغْفَارِ", "Istig'for kalimasi", null, 0, 0, 50, 78, 30, 5],
  ["09", "jumla", "اسْتَغْفِرُ اللَّهَ", "Astaghfirulloh", null, 0, 0, 50, 84, 30, 6],
];

const p35: ED[] = [
  ["01", "jumla", "كَلِمَةُ التَّمْجِيدِ", "Tamjid kalimasi", null, 0, 0, 50, 4, 28, 5],
  ["02", "jumla", "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", "Havqala", null, 0, 0, 50, 12, 50, 6],
  ["03", "jumla", "إِيمَانُ مُجْمَلْ", "Imon mujmal", null, 0, 0, 50, 28, 26, 5],
  ["04", "jumla", "آمَنْتُ بِاللَّهِ", "Allohga ishondim", null, 0, 0, 50, 36, 30, 6],
  ["05", "jumla", "إِيمَانُ مُفَصَّلْ", "Imon mufassal", null, 0, 0, 50, 56, 26, 5],
  ["06", "jumla", "آمَنْتُ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ", "Alloh, farishtalari, kitoblari", null, 0, 0, 50, 64, 60, 6],
];

// ============================================================
// PAGES 36-47 — Suralar (Qur'an surahs)
// ============================================================
const p36: ED[] = [
  ["01", "jumla", "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ", "A'uzubillah", null, 0, 0, 50, 3, 60, 5],
  ["02", "jumla", "بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ", "Bismillah", null, 0, 0, 50, 10, 50, 5],
  ["03", "jumla", "اَلْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", "Fotiha: 1-oyat", null, 0, 0, 50, 18, 50, 6],
  ["04", "jumla", "الرَّحْمٰنِ الرَّحِيمِ", "Fotiha: 2-oyat", null, 0, 0, 50, 24, 36, 6],
  ["05", "jumla", "مَالِكِ يَوْمِ الدِّينِ", "Fotiha: 3-oyat", null, 0, 0, 50, 30, 36, 6],
  ["06", "jumla", "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", "Fotiha: 4-oyat", null, 0, 0, 50, 36, 50, 6],
  ["07", "jumla", "اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", "Fotiha: 5-oyat", null, 0, 0, 50, 42, 50, 6],
  ["08", "jumla", "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ", "Fotiha: 6-oyat", null, 0, 0, 50, 48, 54, 6],
  ["09", "jumla", "غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", "Fotiha: 7-oyat", null, 0, 0, 50, 54, 56, 6],
];

const p37: ED[] = [
  ["01", "jumla", "سُورَةُ الْبَقَرَة", "Baqara surasi", null, 0, 0, 50, 5, 30, 5],
  ["02", "jumla", "ذٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ", "Bu kitobda shubha yo'q", null, 0, 0, 50, 16, 50, 6],
  ["03", "jumla", "هُدًى لِلْمُتَّقِينَ", "Taqvodorlar uchun hidoyat", null, 0, 0, 50, 28, 36, 6],
];

const p38: ED[] = [
  ["01", "jumla", "سُورَةُ الْإِخْلَاصِ", "Ixlos surasi", null, 0, 0, 50, 5, 30, 5],
  ["02", "jumla", "قُلْ هُوَ اللَّهُ أَحَدٌ", "1-oyat", null, 0, 0, 50, 16, 40, 6],
  ["03", "jumla", "اللَّهُ الصَّمَدُ", "2-oyat", null, 0, 0, 50, 28, 30, 6],
  ["04", "jumla", "لَمْ يَلِدْ وَلَمْ يُولَدْ", "3-oyat", null, 0, 0, 50, 40, 40, 6],
  ["05", "jumla", "وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ", "4-oyat", null, 0, 0, 50, 52, 46, 6],
];

const p39: ED[] = [
  ["01", "jumla", "سُورَةُ الْفَلَقِ", "Falaq surasi", null, 0, 0, 50, 5, 28, 5],
  ["02", "jumla", "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", "1-oyat", null, 0, 0, 50, 16, 44, 6],
  ["03", "jumla", "مِنْ شَرِّ مَا خَلَقَ", "2-oyat", null, 0, 0, 50, 28, 36, 6],
  ["04", "jumla", "وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ", "3-oyat", null, 0, 0, 50, 40, 48, 6],
  ["05", "jumla", "وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", "4-oyat", null, 0, 0, 50, 52, 52, 6],
  ["06", "jumla", "وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ", "5-oyat", null, 0, 0, 50, 64, 50, 6],
];

const p40: ED[] = [
  ["01", "jumla", "سُورَةُ النَّاسِ", "Nos surasi", null, 0, 0, 50, 5, 28, 5],
  ["02", "jumla", "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", "1-oyat", null, 0, 0, 50, 16, 44, 6],
  ["03", "jumla", "مَلِكِ النَّاسِ", "2-oyat", null, 0, 0, 50, 28, 28, 6],
  ["04", "jumla", "إِلٰهِ النَّاسِ", "3-oyat", null, 0, 0, 50, 40, 28, 6],
  ["05", "jumla", "مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", "4-oyat", null, 0, 0, 50, 52, 50, 6],
  ["06", "jumla", "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", "5-oyat", null, 0, 0, 50, 64, 54, 6],
  ["07", "jumla", "مِنَ الْجِنَّةِ وَالنَّاسِ", "6-oyat", null, 0, 0, 50, 76, 42, 6],
];

const p41: ED[] = [
  ["01", "jumla", "سُورَةُ الْكَوْثَرِ", "Kavsar surasi", null, 0, 0, 50, 5, 30, 5],
  ["02", "jumla", "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", "1-oyat", null, 0, 0, 50, 18, 46, 6],
  ["03", "jumla", "فَصَلِّ لِرَبِّكَ وَانْحَرْ", "2-oyat", null, 0, 0, 50, 34, 42, 6],
  ["04", "jumla", "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", "3-oyat", null, 0, 0, 50, 50, 46, 6],
];

const p42: ED[] = [
  ["01", "jumla", "سُورَةُ الْعَصْرِ", "Asr surasi", null, 0, 0, 50, 5, 28, 5],
  ["02", "jumla", "وَالْعَصْرِ", "1-oyat", null, 0, 0, 50, 18, 20, 6],
  ["03", "jumla", "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ", "2-oyat", null, 0, 0, 50, 30, 46, 6],
  ["04", "jumla", "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ", "3-oyat (1-qism)", null, 0, 0, 50, 44, 56, 6],
  ["05", "jumla", "وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ", "3-oyat (2-qism)", null, 0, 0, 50, 56, 56, 6],
];

const p43: ED[] = [
  ["01", "jumla", "سُورَةُ الْفِيلِ", "Fil surasi", null, 0, 0, 50, 5, 26, 5],
  ["02", "jumla", "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ", "1-oyat", null, 0, 0, 50, 16, 60, 6],
  ["03", "jumla", "أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ", "2-oyat", null, 0, 0, 50, 30, 56, 6],
];

const p44: ED[] = [
  ["01", "jumla", "سُورَةُ قُرَيْشٍ", "Quraysh surasi", null, 0, 0, 50, 5, 28, 5],
  ["02", "jumla", "لِإِيلَافِ قُرَيْشٍ", "1-oyat", null, 0, 0, 50, 18, 34, 6],
  ["03", "jumla", "إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ", "2-oyat", null, 0, 0, 50, 30, 54, 6],
  ["04", "jumla", "فَلْيَعْبُدُوا رَبَّ هٰذَا الْبَيْتِ", "3-oyat", null, 0, 0, 50, 44, 50, 6],
  ["05", "jumla", "الَّذِي أَطْعَمَهُمْ مِنْ جُوعٍ وَآمَنَهُمْ مِنْ خَوْفٍ", "4-oyat", null, 0, 0, 50, 58, 60, 6],
];

const p45: ED[] = [
  ["01", "jumla", "سُورَةُ الْمَاعُونِ", "Mo'un surasi", null, 0, 0, 50, 5, 30, 5],
  ["02", "jumla", "أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ", "1-oyat", null, 0, 0, 50, 16, 54, 6],
  ["03", "jumla", "فَذٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ", "2-oyat", null, 0, 0, 50, 28, 50, 6],
  ["04", "jumla", "وَلَا يَحُضُّ عَلٰى طَعَامِ الْمِسْكِينِ", "3-oyat", null, 0, 0, 50, 40, 56, 6],
];

const p46: ED[] = [
  ["01", "jumla", "سُورَةُ النَّصْرِ", "Nasr surasi", null, 0, 0, 50, 5, 28, 5],
  ["02", "jumla", "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ", "1-oyat", null, 0, 0, 50, 18, 52, 6],
  ["03", "jumla", "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا", "2-oyat", null, 0, 0, 50, 34, 60, 6],
  ["04", "jumla", "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ", "3-oyat (1-qism)", null, 0, 0, 50, 52, 52, 6],
  ["05", "jumla", "إِنَّهُ كَانَ تَوَّابًا", "3-oyat (2-qism)", null, 0, 0, 50, 64, 38, 6],
];

const p47: ED[] = [
  ["01", "jumla", "سُورَةُ الْكَافِرُونَ", "Kofirun surasi", null, 0, 0, 50, 5, 32, 5],
  ["02", "jumla", "قُلْ يَا أَيُّهَا الْكَافِرُونَ", "1-oyat", null, 0, 0, 50, 16, 46, 6],
  ["03", "jumla", "لَا أَعْبُدُ مَا تَعْبُدُونَ", "2-oyat", null, 0, 0, 50, 28, 44, 6],
  ["04", "jumla", "وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ", "3-oyat", null, 0, 0, 50, 40, 50, 6],
  ["05", "jumla", "لَكُمْ دِينُكُمْ وَلِيَ دِينِ", "6-oyat", null, 0, 0, 50, 64, 44, 6],
];

// ============================================================
// PAGES 48-50 — Duolar (Prayers)
// ============================================================
const p48: ED[] = [
  ["01", "jumla", "الثَّنَاءُ", "Sano", null, 0, 0, 50, 4, 20, 5],
  ["02", "jumla", "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ", "Sano boshi", null, 0, 0, 50, 12, 54, 6],
  ["03", "jumla", "وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ", "Sano davomi", null, 0, 0, 50, 20, 54, 6],
  ["04", "jumla", "وَلَا إِلٰهَ غَيْرُكَ", "Sano oxiri", null, 0, 0, 50, 28, 36, 6],
  ["05", "jumla", "التَّشَهُّدُ", "Tashahhud", null, 0, 0, 50, 38, 22, 5],
  ["06", "jumla", "اَلتَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ", "Tashahhud boshi", null, 0, 0, 50, 48, 60, 6],
  ["07", "jumla", "اَلسَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ", "Salom Payg'ambarga", null, 0, 0, 50, 58, 60, 6],
  ["08", "jumla", "أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللَّهُ", "Shahodat", null, 0, 0, 50, 76, 50, 6],
];

const p49: ED[] = [
  ["01", "jumla", "الصَّلَاةُ الْإِبْرَاهِيمِيَّةُ", "Ibrahimiya salavoti", null, 0, 0, 50, 4, 36, 5],
  ["02", "jumla", "اللَّهُمَّ صَلِّ عَلٰى مُحَمَّدٍ", "Allohim Muhammad(s)ga salavot yubor", null, 0, 0, 50, 14, 50, 6],
  ["03", "jumla", "وَعَلٰى آلِ مُحَمَّدٍ", "Va Muhammad(s) oilasiga", null, 0, 0, 50, 24, 40, 6],
  ["04", "jumla", "كَمَا صَلَّيْتَ عَلٰى إِبْرَاهِيمَ", "Ibrohim(a)ga salavot yuborganday", null, 0, 0, 50, 34, 50, 6],
  ["05", "jumla", "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً", "Rabbano duo (1)", null, 0, 0, 50, 60, 52, 6],
  ["06", "jumla", "وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", "Rabbano duo (2)", null, 0, 0, 50, 72, 60, 6],
];

const p50: ED[] = [
  ["01", "jumla", "دُعَاءُ الْقُنُوتِ", "Qunut duosi", null, 0, 0, 50, 4, 28, 5],
  ["02", "jumla", "اللَّهُمَّ إِنَّا نَسْتَعِينُكَ", "Allohim, Sendan yordam so'raymiz", null, 0, 0, 50, 14, 50, 6],
  ["03", "jumla", "وَنَسْتَغْفِرُكَ وَنُؤْمِنُ بِكَ", "Mag'firat so'raymiz", null, 0, 0, 50, 24, 50, 6],
  ["04", "jumla", "وَنَتَوَكَّلُ عَلَيْكَ", "Senga tavakkal qilamiz", null, 0, 0, 50, 36, 40, 6],
  ["05", "jumla", "وَنُثْنِي عَلَيْكَ الْخَيْرَ", "Senga yaxshilik sanab maqtaymiz", null, 0, 0, 50, 48, 46, 6],
  ["06", "jumla", "وَنَشْكُرُكَ وَلَا نَكْفُرُكَ", "Shukr qilamiz, inkor qilmaymiz", null, 0, 0, 50, 60, 48, 6],
];

// ============================================================
// Export all page elements
// ============================================================
export const PAGE_ELEMENTS: Record<number, Element[]> = {
  1: make(1, p1),
  2: make(2, p2),
  3: make(3, p3),
  4: make(4, p4),
  5: make(5, p5),
  6: make(6, p6),
  7: make(7, p7),
  8: make(8, p8),
  9: make(9, p9),
  10: make(10, p10),
  11: make(11, p11),
  12: make(12, p12),
  13: make(13, p13),
  14: make(14, p14),
  15: make(15, p15),
  16: make(16, p16),
  17: make(17, p17),
  18: make(18, p18),
  19: make(19, p19),
  20: make(20, p20),
  21: make(21, p21),
  22: make(22, p22),
  23: make(23, p23),
  24: make(24, p24),
  25: make(25, p25),
  26: make(26, p26),
  27: make(27, p27),
  28: make(28, p28),
  29: make(29, p29),
  30: make(30, p30),
  31: make(31, p31),
  32: make(32, p32),
  33: make(33, p33),
  34: make(34, p34),
  35: make(35, p35),
  36: make(36, p36),
  37: make(37, p37),
  38: make(38, p38),
  39: make(39, p39),
  40: make(40, p40),
  41: make(41, p41),
  42: make(42, p42),
  43: make(43, p43),
  44: make(44, p44),
  45: make(45, p45),
  46: make(46, p46),
  47: make(47, p47),
  48: make(48, p48),
  49: make(49, p49),
  50: make(50, p50),
};
