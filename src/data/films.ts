import { Film, Showtime, Seat } from '../types/index';

export const FILMS: Film[] = [
  // ── À L'AFFICHE ──────────────────────────────────────────────────────────────
  {
    id: '1',
    title: 'Cyber Warriors',
    description: "Dans un futur dystopique, un groupe de hackers rebelles doit arrêter une IA maléfique qui menace l'humanité. Action et suspense garantis.",
    duration: 142,
    genre: 'Action, Science-Fiction',
    rating: 8.5,
    posterUrl: 'https://images.unsplash.com/photo-1761948245185-fc300ad20316?w=600&q=80',
    releaseDate: '2026-04-10',
    director: 'Emma Chen',
    cast: ['Alex Morgan', 'Sofia Rodriguez', 'James Park'],
    status: 'now-showing',
  },
  {
    id: '2',
    title: 'Galaxie Perdue',
    description: "Une équipe d'explorateurs spatiaux découvre une planète mystérieuse avec des secrets qui pourraient changer l'avenir de l'humanité.",
    duration: 156,
    genre: 'Science-Fiction, Aventure',
    rating: 9.1,
    posterUrl: 'https://images.unsplash.com/photo-1519810755548-39cd217da494?w=600&q=80',
    releaseDate: '2026-03-28',
    director: 'Marcus Johnson',
    cast: ['Rachel Green', 'David Kim', 'Laura Martinez'],
    status: 'now-showing',
  },
  {
    id: '3',
    title: 'Amour à Paris',
    description: "Une comédie romantique sur deux étrangers qui se rencontrent par hasard à Paris et découvrent que l'amour peut surgir là où on s'y attend le moins.",
    duration: 108,
    genre: 'Comédie, Romance',
    rating: 7.8,
    posterUrl: 'https://images.unsplash.com/photo-1573492306465-c19c59eacdd9?w=600&q=80',
    releaseDate: '2026-04-14',
    director: 'Sophie Dubois',
    cast: ['Pierre Laurent', 'Amélie Bernard', 'Thomas Martin'],
    status: 'now-showing',
  },
  {
    id: '4',
    title: 'La Maison des Ombres',
    description: "Un thriller horrifique où une famille emménage dans une ancienne demeure et découvre que certains secrets du passé ne devraient jamais être révélés.",
    duration: 118,
    genre: 'Horreur, Thriller',
    rating: 7.2,
    posterUrl: 'https://images.unsplash.com/photo-1769321309399-38d9eda18370?w=600&q=80',
    releaseDate: '2026-04-12',
    director: 'Robert Black',
    cast: ['Jennifer White', 'Michael Dark', 'Sarah Night'],
    status: 'now-showing',
  },
  {
    id: '5',
    title: 'Les Aventures de Luna',
    description: "Un film d'animation magique sur une jeune fille qui découvre qu'elle peut communiquer avec les animaux et part en quête pour sauver la forêt enchantée.",
    duration: 95,
    genre: 'Animation, Famille',
    rating: 8.9,
    posterUrl: 'https://images.unsplash.com/photo-1773353681034-3736f0fde648?w=600&q=80',
    releaseDate: '2026-04-08',
    director: 'Lisa Anderson',
    cast: ['Voix: Emma Stone', 'Voix: Tom Holland', 'Voix: Zendaya'],
    status: 'now-showing',
  },
  {
    id: '6',
    title: 'Le Dernier Voyage',
    description: "Un explorateur solitaire traverse des paysages épiques dans une quête ultime pour retrouver une civilisation perdue. Une aventure grandiose.",
    duration: 168,
    genre: 'Aventure, Drame',
    rating: 8.7,
    posterUrl: 'https://images.unsplash.com/photo-1761948245703-cbf27a3e7502?w=600&q=80',
    releaseDate: '2026-04-05',
    director: 'Christopher Evans',
    cast: ['Michael Harrison', 'Elena Torres', 'William Chen'],
    status: 'now-showing',
  },
  {
    id: '7',
    title: 'Enquête Mortelle',
    description: "Une détective brillante traque un tueur en série qui laisse des énigmes complexes sur chaque scène de crime. Le temps presse.",
    duration: 134,
    genre: 'Thriller, Mystère',
    rating: 8.3,
    posterUrl: 'https://images.unsplash.com/photo-1765510296004-614b6cc204da?w=600&q=80',
    releaseDate: '2026-04-01',
    director: 'Amanda Cross',
    cast: ['Sarah Mitchell', 'Daniel Brooks', 'Kevin Hart'],
    status: 'now-showing',
  },
  {
    id: '8',
    title: 'Royaume des Ténèbres',
    description: "Dans un monde médiéval fantastique, un jeune guerrier doit unir les royaumes pour combattre une force démoniaque ancestrale.",
    duration: 145,
    genre: 'Fantasy, Action',
    rating: 7.9,
    posterUrl: 'https://images.unsplash.com/photo-1769847780887-dc6f4380621e?w=600&q=80',
    releaseDate: '2026-04-03',
    director: 'Peter Jackson Jr.',
    cast: ['Henry Cavill', 'Emilia Clarke', 'Ian McKellen'],
    status: 'now-showing',
  },
  {
    id: '9',
    title: "Les Gardiens de l'Univers",
    description: "Une équipe de super-héros doit s'unir pour empêcher la destruction de plusieurs dimensions parallèles. Spectacle visuel époustouflant.",
    duration: 152,
    genre: 'Action, Super-Héros',
    rating: 8.8,
    posterUrl: 'https://images.unsplash.com/photo-1650568922476-7e5aa8ed62b1?w=600&q=80',
    releaseDate: '2026-03-25',
    director: 'Ryan Coogler',
    cast: ['Chris Pratt', 'Zoe Saldana', 'Dave Bautista'],
    status: 'now-showing',
  },
  {
    id: '10',
    title: "L'Énigme du Passé",
    description: "Un mystère vieux de 50 ans refait surface quand une journaliste découvre des preuves cachées d'un complot gouvernemental.",
    duration: 128,
    genre: 'Mystère, Drame',
    rating: 7.6,
    posterUrl: 'https://images.unsplash.com/photo-1595148536782-858b8c4312eb?w=600&q=80',
    releaseDate: '2026-04-07',
    director: 'David Fincher',
    cast: ['Rooney Mara', 'Jake Gyllenhaal', 'Tilda Swinton'],
    status: 'now-showing',
  },
  {
    id: '11',
    title: 'Le Réseau',
    description: "Un hacker découvre une conspiration mondiale et doit utiliser ses compétences pour exposer la vérité avant qu'il ne soit trop tard.",
    duration: 115,
    genre: 'Thriller, Crime',
    rating: 7.4,
    posterUrl: 'https://images.unsplash.com/photo-1769397830996-c0e1a18c0a87?w=600&q=80',
    releaseDate: '2026-04-11',
    director: 'Sam Esmail',
    cast: ['Rami Malek', 'Christian Slater', 'Emmy Rossum'],
    status: 'now-showing',
  },
  {
    id: '12',
    title: 'Symphonie Éternelle',
    description: "L'histoire vraie d'un compositeur de génie qui surmonte l'adversité pour créer l'une des plus grandes œuvres musicales de tous les temps.",
    duration: 140,
    genre: 'Musical, Biographie',
    rating: 8.1,
    posterUrl: 'https://images.unsplash.com/photo-1756412955475-7e1ed16869af?w=600&q=80',
    releaseDate: '2026-04-09',
    director: 'Damien Chazelle',
    cast: ['Timothée Chalamet', 'Saoirse Ronan', 'Benedict Cumberbatch'],
    status: 'now-showing',
  },

  // ── BIENTÔT ───────────────────────────────────────────────────────────────────
  {
    id: '13',
    title: 'Eclipse Cosmique',
    description: "Quand le soleil commence à mourir prématurément, une mission spatiale désespérée est lancée pour sauver l'humanité.",
    duration: 163,
    genre: 'Science-Fiction, Drame',
    rating: 8.6,
    posterUrl: 'https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?w=600&q=80',
    releaseDate: '2026-05-15',
    director: 'Denis Villeneuve',
    cast: ['Oscar Isaac', 'Rebecca Ferguson', 'Josh Brolin'],
    status: 'coming-soon',
  },
  {
    id: '14',
    title: 'Rires et Chaos',
    description: "Trois amis d'enfance se retrouvent pour un week-end qui tourne au désastre hilarant. Comédie explosive de l'année.",
    duration: 98,
    genre: 'Comédie',
    rating: 7.3,
    posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80',
    releaseDate: '2026-05-22',
    director: 'Judd Apatow',
    cast: ['Seth Rogen', 'Jonah Hill', 'James Franco'],
    status: 'coming-soon',
  },
  {
    id: '15',
    title: "L'Esprit de la Forêt",
    description: "Une aventure animée épique où des créatures magiques doivent protéger leur monde contre l'industrialisation. Pour toute la famille.",
    duration: 102,
    genre: 'Animation, Aventure',
    rating: 8.4,
    posterUrl: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=600&q=80',
    releaseDate: '2026-06-05',
    director: 'Hayao Miyazaki',
    cast: ['Voix: Tom Hanks', 'Voix: Scarlett Johansson', 'Voix: John Goodman'],
    status: 'coming-soon',
  },
  {
    id: '16',
    title: 'Terres Sauvages',
    description: "Un documentaire immersif sur les dernières régions sauvages de la Terre et les efforts pour les préserver. Visuellement époustouflant.",
    duration: 89,
    genre: 'Documentaire, Nature',
    rating: 9.0,
    posterUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80',
    releaseDate: '2026-05-28',
    director: 'Werner Herzog',
    cast: ['Narrateur: David Attenborough'],
    status: 'coming-soon',
  },
  {
    id: '17',
    title: 'Révolution Silencieuse',
    description: "L'histoire vraie d'un groupe de femmes qui ont changé le cours de l'histoire en défiant le pouvoir établi dans les années 1960.",
    duration: 136,
    genre: 'Drame, Histoire',
    rating: 8.2,
    posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80',
    releaseDate: '2026-06-12',
    director: 'Greta Gerwig',
    cast: ['Margot Robbie', 'Saoirse Ronan', 'Florence Pugh'],
    status: 'coming-soon',
  },
  {
    id: '18',
    title: 'Course Infernale',
    description: "Dans un futur post-apocalyptique, les courses de voitures mortelles sont le seul divertissement. Action non-stop.",
    duration: 125,
    genre: 'Action, Science-Fiction',
    rating: 7.7,
    posterUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80',
    releaseDate: '2026-06-19',
    director: 'George Miller',
    cast: ['Charlize Theron', 'Tom Hardy', 'Anya Taylor-Joy'],
    status: 'coming-soon',
  },
  {
    id: '19',
    title: 'Le Pacte Maudit',
    description: "Un groupe d'amis découvre un livre ancien qui libère une malédiction terrifiante. L'horreur psychologique à son paroxysme.",
    duration: 112,
    genre: 'Horreur, Surnaturel',
    rating: 7.1,
    posterUrl: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=600&q=80',
    releaseDate: '2026-06-26',
    director: 'Ari Aster',
    cast: ['Florence Pugh', 'Jack Reynor', 'William Jackson Harper'],
    status: 'coming-soon',
  },
  {
    id: '20',
    title: 'Destins Croisés',
    description: "Cinq histoires d'amour entrelacées à travers différentes époques et cultures. Un voyage émotionnel inoubliable.",
    duration: 148,
    genre: 'Romance, Drame',
    rating: 8.0,
    posterUrl: 'https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=600&q=80',
    releaseDate: '2026-07-03',
    director: 'Luca Guadagnino',
    cast: ['Timothée Chalamet', 'Zendaya', 'Austin Butler'],
    status: 'coming-soon',
  },

  // ── EN PRODUCTION ─────────────────────────────────────────────────────────────
  {
    id: '21',
    title: 'Chroniques Interstellaires',
    description: "Une saga spatiale épique suivant plusieurs générations de voyageurs cherchant une nouvelle planète pour l'humanité.",
    duration: 180,
    genre: 'Science-Fiction, Épique',
    rating: 0,
    posterUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&q=80',
    releaseDate: '2026-12-25',
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    status: 'in-production',
  },
  {
    id: '22',
    title: 'Le Dernier Samouraï: Origines',
    description: "Préquelle épique explorant les origines légendaires du code des samouraïs. Chorégraphies de combat spectaculaires.",
    duration: 155,
    genre: 'Action, Historique',
    rating: 0,
    posterUrl: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80',
    releaseDate: '2027-01-15',
    director: 'Takashi Miike',
    cast: ['Ken Watanabe', 'Hiroyuki Sanada', 'Rinko Kikuchi'],
    status: 'in-production',
  },
  {
    id: '23',
    title: 'Dragons de Feu',
    description: "Dans un royaume où les dragons et les humains coexistent, une jeune dresseuse doit prévenir une guerre imminente.",
    duration: 138,
    genre: 'Fantasy, Aventure',
    rating: 0,
    posterUrl: 'https://images.unsplash.com/photo-1496065187959-7f07b8353c55?w=600&q=80',
    releaseDate: '2027-02-12',
    director: 'Guillermo del Toro',
    cast: ['Millie Bobby Brown', 'Pedro Pascal', 'Tilda Swinton'],
    status: 'in-production',
  },
  {
    id: '24',
    title: 'Échos du Silence',
    description: "Un thriller psychologique sur une femme qui commence à perdre la capacité d'entendre, révélant des secrets enfouis.",
    duration: 105,
    genre: 'Thriller, Drame',
    rating: 0,
    posterUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80',
    releaseDate: '2027-03-05',
    director: 'Yorgos Lanthimos',
    cast: ['Emma Stone', 'Willem Dafoe', 'Mark Ruffalo'],
    status: 'in-production',
  },
  {
    id: '25',
    title: 'Odyssée Océanique',
    description: "Film d'animation sur les créatures des profondeurs marines et leur lutte pour survivre face au changement climatique.",
    duration: 92,
    genre: 'Animation, Aventure',
    rating: 0,
    posterUrl: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&q=80',
    releaseDate: '2027-04-02',
    director: 'Brad Bird',
    cast: ["Voix: Idris Elba", "Voix: Lupita Nyong'o", 'Voix: Andy Serkis'],
    status: 'in-production',
  },
  {
    id: '26',
    title: 'Le Roi Oublié',
    description: "Biopic épique sur un monarque africain visionnaire du 15ème siècle dont l'héritage a été effacé de l'histoire.",
    duration: 165,
    genre: 'Biographie, Drame',
    rating: 0,
    posterUrl: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=600&q=80',
    releaseDate: '2027-05-20',
    director: 'Steve McQueen',
    cast: ['John Boyega', 'Viola Davis', 'Daniel Kaluuya'],
    status: 'in-production',
  },
  {
    id: '27',
    title: 'Mélodies Interdites',
    description: "Comédie musicale sur un groupe de musiciens underground qui défient la censure dans un régime autoritaire.",
    duration: 128,
    genre: 'Musical, Comédie',
    rating: 0,
    posterUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80',
    releaseDate: '2027-06-18',
    director: 'Lin-Manuel Miranda',
    cast: ['Andrew Garfield', 'Vanessa Hudgens', 'Anthony Ramos'],
    status: 'in-production',
  },
  {
    id: '28',
    title: 'La Vérité du Mensonge',
    description: "Un avocat brillant découvre que son plus grand succès judiciaire repose sur une manipulation. Dilemme moral intense.",
    duration: 142,
    genre: 'Drame, Crime',
    rating: 0,
    posterUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
    releaseDate: '2027-07-25',
    director: 'Aaron Sorkin',
    cast: ['Michael B. Jordan', 'Laura Dern', 'Bryan Cranston'],
    status: 'in-production',
  },
];

// ── SÉANCES ────────────────────────────────────────────────────────────────────
export const showtimes: Showtime[] = [
  // Cyber Warriors
  { id: 's1', movieId: '1', date: '2026-04-16', time: '14:00', room: 'Salle 1', price: 12.50, availableSeats: 45 },
  { id: 's2', movieId: '1', date: '2026-04-16', time: '17:30', room: 'Salle 1', price: 12.50, availableSeats: 38 },
  { id: 's3', movieId: '1', date: '2026-04-16', time: '20:45', room: 'Salle 1', price: 14.00, availableSeats: 22 },
  { id: 's4', movieId: '1', date: '2026-04-17', time: '15:00', room: 'Salle 1', price: 12.50, availableSeats: 50 },
  // Galaxie Perdue
  { id: 's5', movieId: '2', date: '2026-04-16', time: '13:30', room: 'Salle 2', price: 13.00, availableSeats: 28 },
  { id: 's6', movieId: '2', date: '2026-04-16', time: '16:45', room: 'Salle 2', price: 13.00, availableSeats: 15 },
  { id: 's7', movieId: '2', date: '2026-04-16', time: '20:00', room: 'Salle 2', price: 15.00, availableSeats: 8 },
  { id: 's8', movieId: '2', date: '2026-04-17', time: '14:30', room: 'Salle 2', price: 13.00, availableSeats: 50 },
  // Amour à Paris
  { id: 's9',  movieId: '3', date: '2026-04-16', time: '14:30', room: 'Salle 3', price: 11.50, availableSeats: 35 },
  { id: 's10', movieId: '3', date: '2026-04-16', time: '18:00', room: 'Salle 3', price: 11.50, availableSeats: 42 },
  { id: 's11', movieId: '3', date: '2026-04-16', time: '21:15', room: 'Salle 3', price: 13.50, availableSeats: 30 },
  { id: 's12', movieId: '3', date: '2026-04-17', time: '16:00', room: 'Salle 3', price: 11.50, availableSeats: 50 },
  // La Maison des Ombres
  { id: 's13', movieId: '4', date: '2026-04-16', time: '15:15', room: 'Salle 4', price: 12.00, availableSeats: 40 },
  { id: 's14', movieId: '4', date: '2026-04-16', time: '18:30', room: 'Salle 4', price: 12.00, availableSeats: 33 },
  { id: 's15', movieId: '4', date: '2026-04-16', time: '21:45', room: 'Salle 4', price: 14.00, availableSeats: 25 },
  { id: 's16', movieId: '4', date: '2026-04-17', time: '17:00', room: 'Salle 4', price: 12.00, availableSeats: 50 },
  // Les Aventures de Luna
  { id: 's17', movieId: '5', date: '2026-04-16', time: '13:00', room: 'Salle 5', price: 10.00, availableSeats: 45 },
  { id: 's18', movieId: '5', date: '2026-04-16', time: '15:45', room: 'Salle 5', price: 10.00, availableSeats: 38 },
  { id: 's19', movieId: '5', date: '2026-04-16', time: '18:15', room: 'Salle 5', price: 11.00, availableSeats: 40 },
  { id: 's20', movieId: '5', date: '2026-04-17', time: '14:00', room: 'Salle 5', price: 10.00, availableSeats: 50 },
  // Le Dernier Voyage
  { id: 's21', movieId: '6', date: '2026-04-16', time: '13:45', room: 'Salle 6', price: 13.50, availableSeats: 32 },
  { id: 's22', movieId: '6', date: '2026-04-16', time: '17:15', room: 'Salle 6', price: 13.50, availableSeats: 28 },
  { id: 's23', movieId: '6', date: '2026-04-16', time: '20:30', room: 'Salle 6', price: 15.00, availableSeats: 18 },
  // Enquête Mortelle
  { id: 's24', movieId: '7', date: '2026-04-16', time: '14:15', room: 'Salle 7', price: 12.50, availableSeats: 42 },
  { id: 's25', movieId: '7', date: '2026-04-16', time: '18:45', room: 'Salle 7', price: 12.50, availableSeats: 35 },
  { id: 's26', movieId: '7', date: '2026-04-16', time: '21:30', room: 'Salle 7', price: 14.00, availableSeats: 20 },
  // Royaume des Ténèbres
  { id: 's27', movieId: '8', date: '2026-04-16', time: '15:30', room: 'Salle 8', price: 13.00, availableSeats: 38 },
  { id: 's28', movieId: '8', date: '2026-04-16', time: '19:00', room: 'Salle 8', price: 13.00, availableSeats: 25 },
  { id: 's29', movieId: '8', date: '2026-04-16', time: '22:00', room: 'Salle 8', price: 14.50, availableSeats: 12 },
  // Les Gardiens de l'Univers
  { id: 's30', movieId: '9', date: '2026-04-16', time: '13:15', room: 'Salle 9', price: 14.00, availableSeats: 20 },
  { id: 's31', movieId: '9', date: '2026-04-16', time: '16:30', room: 'Salle 9', price: 14.00, availableSeats: 15 },
  { id: 's32', movieId: '9', date: '2026-04-16', time: '19:45', room: 'Salle 9', price: 15.50, availableSeats: 8 },
  // L'Énigme du Passé
  { id: 's33', movieId: '10', date: '2026-04-16', time: '14:45', room: 'Salle 10', price: 12.00, availableSeats: 40 },
  { id: 's34', movieId: '10', date: '2026-04-16', time: '18:20', room: 'Salle 10', price: 12.00, availableSeats: 36 },
  { id: 's35', movieId: '10', date: '2026-04-16', time: '21:00', room: 'Salle 10', price: 13.50, availableSeats: 28 },
  // Le Réseau
  { id: 's36', movieId: '11', date: '2026-04-16', time: '16:00', room: 'Salle 11', price: 11.50, availableSeats: 48 },
  { id: 's37', movieId: '11', date: '2026-04-16', time: '19:30', room: 'Salle 11', price: 11.50, availableSeats: 42 },
  { id: 's38', movieId: '11', date: '2026-04-16', time: '22:15', room: 'Salle 11', price: 13.00, availableSeats: 30 },
  // Symphonie Éternelle
  { id: 's39', movieId: '12', date: '2026-04-16', time: '15:00', room: 'Salle 12', price: 13.00, availableSeats: 35 },
  { id: 's40', movieId: '12', date: '2026-04-16', time: '18:30', room: 'Salle 12', price: 13.00, availableSeats: 30 },
  { id: 's41', movieId: '12', date: '2026-04-16', time: '21:45', room: 'Salle 12', price: 14.50, availableSeats: 22 },
];

// ── SALLE : 10 rangées × 12 sièges, VIP = H I J ───────────────────────────────
export const VIP_ROWS = ['H', 'I', 'J'];
export const ROWS     = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

export function generateTakenSeats(filmId: string): Record<string, boolean> {
  const taken: Record<string, boolean> = {};
  const seed = parseInt(filmId, 10) * 13;
  for (let i = 0; i < 18; i++) {
    const row = ROWS[Math.floor((seed * i * 7 + i * 3) % 10)];
    const col = 1 + Math.floor((seed * i * 11 + i * 5) % 12);
    taken[`${row}${col}`] = true;
  }
  return taken;
}

export function getSeatPrice(seatId: string, basePrice: number): number {
  return VIP_ROWS.includes(seatId[0]) ? basePrice + 4 : basePrice;
}

export function getSeatType(seatId: string): 'vip' | 'standard' {
  return VIP_ROWS.includes(seatId[0]) ? 'vip' : 'standard';
}

export function generateSeats(showtimeId: string): Seat[] {
  const seats: Seat[] = [];
  const seatsPerRow = 12;
  const occupiedSeats = new Set<string>();
  const numOccupied = Math.floor(Math.random() * 30) + 10;
  for (let i = 0; i < numOccupied; i++) {
    const randomRow = ROWS[Math.floor(Math.random() * ROWS.length)];
    const randomNumber = Math.floor(Math.random() * seatsPerRow) + 1;
    occupiedSeats.add(`${randomRow}${randomNumber}`);
  }
  ROWS.forEach(row => {
    for (let num = 1; num <= seatsPerRow; num++) {
      const seatId = `${row}${num}`;
      seats.push({
        id: seatId, row, number: num,
        isAvailable: !occupiedSeats.has(seatId),
        type: VIP_ROWS.includes(row) ? 'vip' : 'standard',
      });
    }
  });
  return seats;
}

/**
 * Retourne les genres uniques extraits de tous les films,
 * filtrés optionnellement par statut.
 */
export function getAllGenres(status?: string): string[] {
  const source = status ? FILMS.filter(f => f.status === status) : FILMS;
  const set = new Set<string>();
  source.forEach(f => f.genre.split(', ').forEach(g => set.add(g.trim())));
  return ['Tous', ...Array.from(set).sort()];
}

/** Constante de genres pour le filtre de la HomePage (dérivée dynamiquement). */
export const GENRES = getAllGenres() as string[];
