/* Content: emotions on the tree + scientific facts. Plain globals, no build step. */
window.OCEAN_DATA = {
  /* zone keys map to the tree region where their emotions sit */
  emotions: {
    epi: [
      { de: 'Freude', ar: 'فرح', text: 'Sie wächst ganz oben, wo das Licht am meisten trifft. Leicht zu zeigen, leicht zu teilen.', sea: 'In der Sonnenzone entsteht durch Photosynthese des Phytoplanktons rund die Hälfte des Sauerstoffs, den wir atmen.' },
      { de: 'Hoffnung', ar: 'أمل', text: 'Ein Blatt, das sich zum Licht dreht – auch wenn es nicht weiß, wie lange es noch scheint.', sea: 'Sonnenlicht reicht maximal etwa 1.000 m tief. Hoffnung, so scheint es, reicht weiter.' },
      { de: 'Neugier', ar: 'فضول', text: 'Der Ast, der am weitesten hinausragt. Ohne sie wäre niemand je getaucht.', sea: 'Rund drei Viertel des Meeresbodens sind bis heute nicht hochauflösend kartiert.' },
      { de: 'Leichtigkeit', ar: 'خفّة', text: 'Sie hält nur, solange das Wasser warm ist. Sie ist das Erste, was man beim Sinken verliert.', sea: 'Mit jeden 10 Metern Tiefe steigt der Druck um etwa 1 bar – an der Oberfläche spürt man davon nichts.' },
      { de: 'Staunen', ar: 'دهشة', text: 'Der Moment, bevor man versteht. Kinder wohnen hier.', sea: 'Ein einziger Sardinenschwarm kann viele Millionen Fische umfassen – und sich bewegen wie ein Körper.' }
    ],
    meso: [
      { de: 'Sehnsucht', ar: 'حنين', text: 'Der Blick nach oben, zum Licht, das man noch ahnt, aber nicht mehr erreicht.', sea: 'Viele Tiere der Dämmerzone steigen jede Nacht hunderte Meter auf – und sinken bei Tagesanbruch zurück.' },
      { de: 'Melancholie', ar: 'شجن', text: 'Nicht Trauer, nicht Freude – ein blaues Dazwischen. Schön auf eine Art, die wehtut.', sea: 'Blaues Licht (um 470 nm) dringt im Wasser am tiefsten. Die Dämmerzone ist buchstäblich blau.' },
      { de: 'Zweifel', ar: 'شكّ', text: 'Die Äste werden dünner, die Richtung unklar. Zweifel ist das Gefühl, dass der Boden fehlt.', sea: 'Beilfische tarnen sich mit Leuchtorganen am Bauch – sie ersetzen das fehlende Licht von oben, damit ihr Schatten verschwindet.' },
      { de: 'Stille', ar: 'صمت', text: 'Hier wird es leise. Nicht leer – leise. Man hört zum ersten Mal sich selbst.', sea: 'Schall reist im Wasser etwa 4,5-mal schneller als in Luft. In der SOFAR-Schicht trägt er über tausende Kilometer.' },
      { de: 'Erinnerung', ar: 'ذكرى', text: 'Blätter, die sich gelöst haben, schweben noch eine Weile neben dir her.', sea: 'Meeresschnee – abgestorbenes organisches Material – rieselt ständig in die Tiefe und ernährt das Leben darunter.' }
    ],
    bathy: [
      { de: 'Angst', ar: 'خوف', text: 'Sie wohnt dort, wo man nichts mehr sieht. Sie ist nicht der Feind – sie ist ein Wächter.', sea: 'Die Atolla-Qualle löst bei Angriff ein kreisendes Lichtsignal aus – ein „Alarm“, der größere Räuber anlockt.' },
      { de: 'Trauer', ar: 'حزن', text: 'Das Gewicht all der Blätter, die gegangen sind. Trauer ist Liebe, die keinen Ort mehr hat.', sea: 'Ab 1.000 m herrschen meist nur noch etwa 4 °C – das ganze Jahr, Tag und Nacht gleich.' },
      { de: 'Einsamkeit', ar: 'وحدة', text: 'In der Dunkelheit ist jeder allein – bis jemand zu leuchten beginnt.', sea: 'Bei manchen Anglerfischen verwachsen die winzigen Männchen dauerhaft mit dem Weibchen – Partner zu finden ist hier so selten.' },
      { de: 'Verlust', ar: 'فقد', text: 'Der Baum ist kahl. Und gerade deshalb sieht man jetzt, woraus er wirklich besteht.', sea: 'Ein Walkadaver am Meeresboden („Whale Fall“) kann Jahrzehnte lang ganze Gemeinschaften ernähren.' }
    ],
    roots: [
      { de: 'Vertrauen', ar: 'ثقة', text: 'Die tiefste Wurzel. Sie hält, auch wenn man sie nicht sieht.', sea: 'Riesenröhrenwürmer haben weder Mund noch Darm – sie vertrauen vollständig auf Bakterien in ihrem Körper.' },
      { de: 'Geduld', ar: 'صبر', text: 'Wurzeln wachsen langsam. Nichts hier unten hat es eilig.', sea: 'Tiefseekorallen und manche Tiefseeschwämme können Jahrtausende alt werden.' },
      { de: 'Liebe', ar: 'حبّ', text: 'Sie war nie in den Blättern. Sie war immer hier unten und hat alles getragen.', sea: 'Biolumineszenz ist im Meer mindestens dutzendfach unabhängig entstanden – Licht ist hier die Sprache, mit der man sich findet.' },
      { de: 'Ursprung', ar: 'أصل', text: 'Woher wir kommen. Die ersten Lebewesen entstanden womöglich an Quellen wie diesen.', sea: 'Eine führende Hypothese verortet den Ursprung des Lebens an hydrothermalen Quellen in der Tiefsee.' },
      { de: 'Dankbarkeit', ar: 'امتنان', text: 'Für alles, was gefallen ist – denn es hat den Weg nach unten gezeigt.', sea: 'Der Meeresboden speichert über Meeresschnee riesige Mengen Kohlenstoff – über Jahrhunderte bis Jahrmillionen.' }
    ]
  },

  zoneNames: { epi: 'Sonnenzone · Äste im Licht', meso: 'Dämmerzone · mittlere Äste', bathy: 'Mitternachtszone · untere Äste', roots: 'Hadal · Wurzeln' },

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
    jelly: {
      meta: 'Sonnenzone', title: 'Ohrenqualle', ar: 'قنديل البحر',
      body: 'Aurelia aurita treibt meist dicht unter der Oberfläche und ernährt sich von kleinem Plankton. Mit über 95 % Wasser ist sie fast durchsichtig – ein Körper aus Licht und Puls.',
      stats: [['Tiefe', '0 – 200 m'], ['Körper', '> 95 % Wasser']]
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
