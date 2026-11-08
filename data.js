/* Content: emotions on the tree + scientific facts. Plain globals, no build step. */
window.OCEAN_DATA = {
  /* Exactly ONE emotion per zone (AGENTS.md › Nordstern). Everything in the zone serves it. */
  emotions: {
    epi: {
      de: 'Leichtigkeit', ar: 'خفّة', zone: 'Sonnenzone · 0 – 200 m',
      text: 'Alles trägt hier: das Licht, das Wasser, du selbst. Leichtigkeit ist das Erste, was man beim Sinken verliert – und man merkt es erst, wenn sie fehlt.',
      sea: 'Phytoplankton in dieser Schicht erzeugt rund die Hälfte des Sauerstoffs der Erde.'
    },
    meso: {
      de: 'Stille', ar: 'صمت', zone: 'Dämmerzone · 200 – 1.000 m',
      text: 'Nicht leer – leise. Die Blätter lösen sich ohne Geräusch. Zum ersten Mal hört man sich selbst.',
      sea: 'Bei 200 m kommt nur noch rund 1 % des Sonnenlichts an; ab etwa 1.000 m nichts mehr.'
    },
    bathy: {
      de: 'Einsamkeit', ar: 'وحدة', zone: 'Mitternachtszone · 1.000 – 4.000 m',
      text: 'Kein Sonnenstrahl erreicht diese Tiefe. Wer hier gesehen werden will, muss sein eigenes Licht machen.',
      sea: 'Bei manchen Anglerfischen verwächst das winzige Männchen dauerhaft mit dem Weibchen – so selten sind Begegnungen.'
    },
    abysso: {
      de: 'Ehrfurcht', ar: 'خشوع', zone: 'Tiefsee-Ebene · 4.000 – 6.000 m',
      text: 'Auf jedem Quadratzentimeter lasten rund 500 Kilogramm. Und trotzdem: Leben, das die Sonne nie gebraucht hat.',
      sea: 'An hydrothermalen Quellen leben ganze Gemeinschaften von Chemosynthese statt von Licht.'
    },
    roots: {
      de: 'Trost', ar: 'عزاء', zone: 'Hadal · 6.000 – 10.935 m',
      text: 'Der Baum hat alles losgelassen, was leicht war. Was bleibt, sind seine Wurzeln – und sie halten.',
      sea: 'Selbst im Challenger-Tief, bei über 1.000 bar, leben Flohkrebse und einzellige Foraminiferen.'
    }
  },

  /* Facts for creatures + zones (modal content) */
  info: {
    'zone-epi': {
      meta: 'Zone · 0 – 200 m', title: 'Epipelagial – die Sonnenzone', ar: 'منطقة ضوء الشمس',
      body: 'Die oberste Schicht des Ozeans erhält genug Licht für Photosynthese. Phytoplankton produziert hier etwa die Hälfte des Sauerstoffs der Erde. Obwohl sie nur einen winzigen Teil des Ozeanvolumens ausmacht, lebt hier ein Großteil der bekannten Meerestiere.',
      stats: [['Licht', '100 % → ~1 %'], ['Temperatur', 'bis ~30 °C, je nach Breite'], ['Druck', '1 – 21 bar']]
    },
    'zone-meso': {
      meta: 'Zone · 200 – 1.000 m', title: 'Mesopelagial – die Dämmerzone', ar: 'منطقة الشفق',
      body: 'Zu wenig Licht für Photosynthese, aber genug zum Sehen. Hier findet die tägliche Vertikalwanderung statt: Milliarden Tiere steigen nachts zum Fressen auf und sinken morgens zurück. Viele Bewohner nutzen Gegenbeleuchtung – sie leuchten am Bauch, um ihre Silhouette zu verbergen.',
      stats: [['Licht', '~1 % → 0'], ['Temperatur', '~4 – 15 °C'], ['Druck', '21 – 101 bar']]
    },
    'zone-bathy': {
      meta: 'Zone · 1.000 – 4.000 m', title: 'Bathypelagial – die Mitternachtszone', ar: 'منطقة منتصف الليل',
      body: 'Kein Sonnenlicht mehr. Das einzige Licht ist Biolumineszenz – erzeugt durch die Reaktion von Luciferin und Luciferase. Eine Studie vor Kalifornien fand, dass rund 76 % der beobachteten Tiere der Wassersäule leuchten können. Nahrung ist knapp: Viele Tiere haben riesige Mäuler und dehnbare Mägen.',
      stats: [['Licht', 'nur Biolumineszenz'], ['Temperatur', '~4 °C'], ['Druck', '101 – 401 bar']]
    },
    'zone-abysso': {
      meta: 'Zone · 4.000 – 6.000 m', title: 'Abyssopelagial – die Tiefsee-Ebene', ar: 'السهل السحيق',
      body: 'Die weiten Tiefsee-Ebenen bedecken einen großen Teil des Planeten. Das Wasser ist nahe dem Gefrierpunkt, Nahrung kommt fast nur als Meeresschnee von oben. An Hydrothermalquellen (meist an mittelozeanischen Rücken) entstehen dagegen Oasen, die auf Chemosynthese statt Sonnenlicht beruhen.',
      stats: [['Licht', 'keins'], ['Temperatur', '~2 – 3 °C'], ['Druck', '401 – 601 bar']]
    },
    'zone-hadal': {
      meta: 'Zone · 6.000 – 10.935 m', title: 'Hadal – die Tiefseegräben', ar: 'منطقة الخنادق',
      body: 'Benannt nach Hades. Die Gräben entstehen dort, wo eine tektonische Platte unter eine andere taucht. Der tiefste bekannte Punkt ist das Challenger-Tief im Marianengraben, rund 10.935 m. 1960 erreichten Jacques Piccard und Don Walsh es erstmals mit der Trieste.',
      stats: [['Licht', 'keins'], ['Temperatur', '~1 – 4 °C'], ['Druck', 'bis ~1.100 bar']]
    },
    sardines: {
      meta: 'Sonnenzone', title: 'Sardinenschwarm', ar: 'سرب السردين',
      body: 'Schwärme verwirren Räuber: Tausende identische Körper machen es schwer, ein einzelnes Ziel zu fixieren. Jeder Fisch orientiert sich an seinen nächsten Nachbarn über Augen und Seitenlinienorgan – ohne Anführer.',
      stats: [['Tiefe', '0 – ~100 m'], ['Strategie', 'Sicherheit in der Masse']]
    },
    turtle: {
      meta: 'Sonnenzone', title: 'Grüne Meeresschildkröte', ar: 'السلحفاة الخضراء',
      body: 'Chelonia mydas wandert tausende Kilometer zwischen Weidegründen und Nistplätzen – und kehrt zum Eiablegen oft an den Strand zurück, an dem sie selbst geschlüpft ist. Ausgewachsen ernährt sie sich vor allem von Seegras und Algen.',
      stats: [['Tiefe', 'meist < 50 m'], ['Alter', 'kann über 70 Jahre werden']]
    },
    coral: {
      meta: 'Sonnenzone', title: 'Korallenriff', ar: 'الشعاب المرجانية',
      body: 'Riffbildende Korallen leben in Symbiose mit Algen (Zooxanthellen), die ihnen per Photosynthese Energie liefern – deshalb brauchen sie Licht. Riffe bedecken weniger als 1 % des Meeresbodens, beherbergen aber etwa ein Viertel aller Meeresarten.',
      stats: [['Tiefe', 'meist < 50 m'], ['Bedrohung', 'Korallenbleiche durch Erwärmung']]
    },
    whale: {
      meta: 'Dämmerzone', title: 'Pottwal', ar: 'حوت العنبر',
      body: 'Der größte Zahnwal taucht regelmäßig über 1.000 m tief, um Tintenfische zu jagen – Tauchgänge können über eine Stunde dauern. Er orientiert sich per Echoortung; seine Klicks gehören zu den lautesten Geräuschen im Tierreich.',
      stats: [['Tauchtiefe', 'oft 400 – 1.200 m, mehr möglich'], ['Länge', 'bis ~16 m (Männchen)']]
    },
    siphonophore: {
      meta: 'Dämmerzone', title: 'Staatsqualle (Siphonophore)', ar: 'قنديل المستعمرة',
      body: 'Kein einzelnes Tier, sondern eine Kolonie spezialisierter Einzeltiere (Zooide) – manche schwimmen, manche fressen, manche pflanzen sich fort. Einige Arten werden über 40 m lang und gehören damit zu den längsten Lebewesen der Erde.',
      stats: [['Tiefe', 'Oberfläche bis Tiefsee'], ['Besonderheit', 'ein „Wir“ statt ein „Ich“']]
    },
    lanternfish: {
      meta: 'Dämmerzone', title: 'Laternenfische', ar: 'أسماك الفانوس',
      body: 'Myctophiden gehören zu den häufigsten Wirbeltieren der Erde. Ihre Leuchtorgane (Photophoren) bilden artspezifische Muster. Nachts steigen sie zum Fressen nahe an die Oberfläche – und transportieren so Kohlenstoff in die Tiefe.',
      stats: [['Tiefe', 'tagsüber ~300 – 1.500 m'], ['Größe', 'meist 2 – 15 cm']]
    },
    angler: {
      meta: 'Mitternachtszone', title: 'Tiefsee-Anglerfisch', ar: 'سمكة أبو الشص',
      body: 'Das Weibchen trägt eine leuchtende „Angel“ (Esca), in der symbiotische Bakterien Licht erzeugen. Bei manchen Arten beißen sich die winzigen Männchen am Weibchen fest und verschmelzen dauerhaft mit ihm – Sexualparasitismus.',
      stats: [['Tiefe', 'meist 1.000 – 4.000 m'], ['Licht', 'von Bakterien geliehen']]
    },
    atolla: {
      meta: 'Mitternachtszone', title: 'Atolla-Qualle', ar: 'قنديل أتولا',
      body: 'Wird sie angegriffen, lässt sie blaue Lichtwellen um ihren Schirm kreisen – den sogenannten „Einbrecher-Alarm“. Die Hypothese: Das Licht lockt einen noch größeren Räuber an, der ihren Angreifer frisst.',
      stats: [['Tiefe', '~1.000 – 4.000 m'], ['Signal', 'kreisende blaue Lichtwellen']]
    },
    vampire: {
      meta: 'Mitternachtszone', title: 'Vampirtintenfisch', ar: 'الحبار مصاص الدماء',
      body: 'Vampyroteuthis infernalis ist weder Vampir noch echter Tintenfisch, sondern ein eigener, uralter Zweig. Statt Tinte stößt er bei Gefahr eine Wolke leuchtenden Schleims aus. Er lebt in sauerstoffarmen Zonen und ernährt sich friedlich von Meeresschnee.',
      stats: [['Tiefe', '~600 – 1.200 m'], ['Nahrung', 'Meeresschnee']]
    },
    dumbo: {
      meta: 'Tiefsee-Ebene', title: 'Dumbo-Oktopus', ar: 'أخطبوط دامبو',
      body: 'Die Gattung Grimpoteuthis verdankt ihren Namen den ohrenartigen Flossen, mit denen sie durchs Wasser „fliegt“. Dumbo-Oktopusse gehören zu den am tiefsten lebenden Kraken – sie wurden noch in rund 7.000 m Tiefe beobachtet.',
      stats: [['Tiefe', '~1.000 – 7.000 m'], ['Größe', 'meist 20 – 30 cm']]
    },
    vent: {
      meta: 'Tiefsee-Ebene', title: 'Schwarzer Raucher', ar: 'المدخنة السوداء',
      body: 'Meerwasser sickert in den Meeresboden, wird von Magma erhitzt und schießt mineralreich wieder heraus – bis etwa 400 °C heiß, durch den enormen Druck dennoch flüssig. Die gelösten Metallsulfide fallen aus und färben das Wasser schwarz.',
      stats: [['Wassertemperatur', 'bis ~400 °C'], ['Entdeckt', '1977 (Galápagos-Riftzone, Tauchboot Alvin)']]
    },
    tubeworm: {
      meta: 'Tiefsee-Ebene', title: 'Riesenröhrenwurm', ar: 'الدودة الأنبوبية العملاقة',
      body: 'Riftia pachyptila wird über 2 m lang und hat weder Mund noch Darm. Bakterien in seinem Körper wandeln Schwefelwasserstoff aus den Quellen in Nahrung um. Die rote Farbe der Federn stammt von Hämoglobin.',
      stats: [['Länge', 'bis über 2 m'], ['Energie', 'Chemosynthese']]
    },
    snailfish: {
      meta: 'Hadal', title: 'Mariana-Scheibenbauch', ar: 'سمكة الحلزون',
      body: 'Pseudoliparis swirei lebt in rund 7.000 – 8.000 m Tiefe im Marianengraben. Sein Körper ist gallertartig, sein Skelett teils unverknöchert. Unterhalb von etwa 8.200 – 8.400 m scheint für Fische eine physiologische Grenze zu liegen.',
      stats: [['Tiefe', '~6.900 – 8.000 m'], ['Rekord', 'tiefster gefilmter Fisch ~8.336 m (2022, Scheibenbauch)']]
    },
    amphipod: {
      meta: 'Hadal', title: 'Tiefsee-Flohkrebs', ar: 'مزدوجات الأرجل',
      body: 'Hirondellea gigas lebt bis zum Grund des Challenger-Tiefs. Er kann mit einem besonderen Enzym Holz – herabgesunkene Pflanzenreste – verdauen und schützt seinen Panzer mit Aluminium gegen das korrosive Tiefenwasser.',
      stats: [['Tiefe', 'bis ~10.900 m'], ['Größe', 'wenige Zentimeter']]
    }
  }
};
