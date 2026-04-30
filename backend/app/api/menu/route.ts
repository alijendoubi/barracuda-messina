import { NextResponse } from "next/server";

interface MenuItem {
  n: string;
  d: string;
  p: string;
}

interface MenuSection {
  cat: string;
  desc: string;
  items: MenuItem[];
}

const MENU_DATA: Record<"it" | "en", MenuSection[]> = {
  it: [
    {
      cat: "Aperitivi",
      desc: "Per cominciare. Ghiaccio, sale, sole.",
      items: [
        { n: "Acqua di mare", d: "Spritz al gelsomino, sale di Trapani, scorza di limone.", p: "12" },
        { n: "Negroni mediterraneo", d: "Gin al rosmarino, vermouth siciliano, bitter al carciofo.", p: "14" },
        { n: "Granita di pomodoro", d: "Pomodoro datterino, basilico, olio EVO.", p: "10" },
      ],
    },
    {
      cat: "Crudi & antipasti",
      desc: "Il pescato del giorno, lavorato in mattinata.",
      items: [
        { n: "Tartare di tonno rosso", d: "Cipollotto, lime, alga nori, fior di sale.", p: "22" },
        { n: "Gambero viola di Mazara", d: "Ostriche fini de claire, scorza di bergamotto.", p: "26" },
        { n: "Caponata al fumo", d: "Melanzane, capperi, mandorle tostate, ricotta affumicata.", p: "16" },
      ],
    },
    {
      cat: "Pizze d'autore",
      desc: "Lievitazione 72 ore. Forno a legna di ulivo.",
      items: [
        { n: "Stretto", d: "Pomodoro giallo del Vesuvio, alici di Cetara, capperi di Salina, origano selvatico.", p: "18" },
        { n: "Tramonto", d: "Burrata di Andria, mortadella al pistacchio di Bronte, scorza di limone interdonato.", p: "19" },
        { n: "Scirocco", d: "Crema di melanzane, ricotta salata, pomodorini confit, basilico, mandorle.", p: "18" },
        { n: "Mare nostro", d: "Crudo di gambero rosso, stracciatella, polvere di pomodoro, lime.", p: "22" },
        { n: "Etna", d: "Salsiccia di maialino nero, scamorza, friarielli, peperoncino di Sciacca.", p: "19" },
        { n: "Bianca", d: "Fior di latte, pecorino di fossa, pepe nero di Sarawak, miele di castagno.", p: "17" },
      ],
    },
    {
      cat: "Dolci",
      desc: "Tradizione siciliana, mano leggera.",
      items: [
        { n: "Cassata bianca", d: "Ricotta di pecora, cedro, cioccolato fondente, pasta reale.", p: "10" },
        { n: "Granita al gelsomino", d: "Servita con brioche col tuppo tiepida.", p: "9" },
        { n: "Cannolo scomposto", d: "Crema di ricotta, scorze candite, pistacchio di Bronte.", p: "10" },
      ],
    },
    {
      cat: "Cantina",
      desc: "Vini siciliani naturali, in via di scoperta.",
      items: [
        { n: "Frappato dell'Etna", d: "Calice — Tenuta delle Terre Nere", p: "8" },
        { n: "Carricante 2023", d: "Bottiglia — Pietradolce", p: "48" },
        { n: "Nerello mascalese", d: "Bottiglia — Graci", p: "52" },
      ],
    },
  ],
  en: [
    {
      cat: "Aperitifs",
      desc: "To begin. Ice, salt, sun.",
      items: [
        { n: "Acqua di mare", d: "Jasmine spritz, Trapani salt, lemon zest.", p: "12" },
        { n: "Mediterranean negroni", d: "Rosemary gin, Sicilian vermouth, artichoke bitter.", p: "14" },
        { n: "Tomato granita", d: "Datterino tomato, basil, EVO olive oil.", p: "10" },
      ],
    },
    {
      cat: "Crudo & antipasti",
      desc: "The catch of the day, prepared each morning.",
      items: [
        { n: "Bluefin tuna tartare", d: "Spring onion, lime, nori, sea salt flakes.", p: "22" },
        { n: "Mazara red prawn", d: "Fines de claire oysters, bergamot zest.", p: "26" },
        { n: "Smoked caponata", d: "Aubergine, capers, toasted almonds, smoked ricotta.", p: "16" },
      ],
    },
    {
      cat: "Signature pizzas",
      desc: "72-hour rise. Olive-wood fired.",
      items: [
        { n: "Stretto", d: "Yellow Vesuvio tomato, Cetara anchovies, Salina capers, wild oregano.", p: "18" },
        { n: "Tramonto", d: "Burrata from Andria, Bronte pistachio mortadella, Interdonato lemon zest.", p: "19" },
        { n: "Scirocco", d: "Aubergine cream, salted ricotta, confit cherry tomatoes, basil, almonds.", p: "18" },
        { n: "Mare nostro", d: "Raw red prawn, stracciatella, tomato powder, lime.", p: "22" },
        { n: "Etna", d: "Black pork sausage, scamorza, friarielli, Sciacca chili.", p: "19" },
        { n: "Bianca", d: "Fior di latte, pit-aged pecorino, Sarawak black pepper, chestnut honey.", p: "17" },
      ],
    },
    {
      cat: "Desserts",
      desc: "Sicilian tradition, a light hand.",
      items: [
        { n: "White cassata", d: "Sheep's ricotta, citron, dark chocolate, marzipan.", p: "10" },
        { n: "Jasmine granita", d: "Served with warm tuppo brioche.", p: "9" },
        { n: "Deconstructed cannolo", d: "Ricotta cream, candied peel, Bronte pistachio.", p: "10" },
      ],
    },
    {
      cat: "Cellar",
      desc: "Natural Sicilian wines, in the act of discovery.",
      items: [
        { n: "Etna Frappato", d: "Glass — Tenuta delle Terre Nere", p: "8" },
        { n: "Carricante 2023", d: "Bottle — Pietradolce", p: "48" },
        { n: "Nerello mascalese", d: "Bottle — Graci", p: "52" },
      ],
    },
  ],
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lang = (searchParams.get("lang") ?? "it") as "it" | "en";
  const data = MENU_DATA[lang] ?? MENU_DATA.it;
  return NextResponse.json({ lang, sections: data });
}
