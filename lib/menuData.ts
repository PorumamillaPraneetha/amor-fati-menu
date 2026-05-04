export type Category = { id: string; name: string; emoji: string };

export const categories: Category[] = [
  { id: 'all', name: 'All Items', emoji: '✨' },
  { id: 'french-toasts', name: 'French Toasts', emoji: '🍞' },
  { id: 'coffee', name: 'Coffee & Co', emoji: '☕' },
  { id: 'matcha', name: 'Matcha', emoji: '🍵' },
  { id: 'fried', name: 'Fried Foods', emoji: '🍟' },
  { id: 'pizza', name: 'Pizza', emoji: '🍕' },
  { id: 'burgers', name: 'Burgers', emoji: '🍔' },
  { id: 'wraps', name: 'Wraps', emoji: '🌯' },
  { id: 'bowls', name: 'Bowls', emoji: '🥣' },
  { id: 'shakes', name: 'Shakes', emoji: '🥤' },
  { id: 'brownie', name: 'Brownie', emoji: '🍫' },
  { id: 'choco-dips', name: 'Choco Sauce Dips', emoji: '🍫' },
  { id: 'coolers', name: 'Coolers', emoji: '🧊' },
];


export type MenuItem = {
  id: string;
  category: string;
  name: string;
  price: number;
  veg: boolean;
  mustTry: boolean;
  description: string;
  image: string;
  sub?: string;
};

export const menuItems: MenuItem[] = [

  // ─── FRENCH TOASTS ─────────────────────────────────────────────────
  {
    id: 'ft-01', category: 'french-toasts', name: 'Classic French Toast', price: 229, veg: true, mustTry: false,
    description: 'Golden brioche slices soaked in a rich egg custard, pan-seared to perfection and dusted with powdered sugar.',
    image: '/french-toasts/classic-french-toast.png'
  },
  {
    id: 'ft-02', category: 'french-toasts', name: 'Caramel French Toast', price: 249, veg: true, mustTry: false,
    description: 'Buttery French toast drenched in a velvety house-made caramel sauce — indulgent and irresistible.',
    image: '/french-toasts/caramel-french-toast.png'
  },
  {
    id: 'ft-03', category: 'french-toasts', name: 'Strawberry French Toast', price: 279, veg: true, mustTry: true,
    description: 'Crisp golden French toast topped with fresh strawberries and a luscious strawberry coulis.',
    image: '/french-toasts/strawberry-french-toast.png'
  },
  {
    id: 'ft-04', category: 'french-toasts', name: 'Mango French Toast', price: 299, veg: true, mustTry: true,
    description: 'Thick French toast crowned with sweet Alphonso mango slices and a drizzle of mango coulis — a tropical delight.',
    image: '/french-toasts/mango-french-toast.png'
  },

  // ─── COFFEE & CO ───────────────────────────────────────────────────
  {
    id: 'cf-01', category: 'coffee', name: 'Coffee', price: 59, veg: true, mustTry: true,
    description: 'Our signature house coffee — smooth, aromatic, freshly brewed.',
    image: '/coffee/coffee.png'
  },
  {
    id: 'cf-02', category: 'coffee', name: 'Black Coffee', price: 79, veg: true, mustTry: false,
    description: 'Pure, bold espresso — strong, unadulterated and energising.',
    image: '/coffee/black-coffee.png'
  },
  {
    id: 'cf-03', category: 'coffee', name: 'Cold Coffee', price: 129, veg: true, mustTry: false,
    description: 'Chilled, creamy coffee blended to smooth perfection.',
    image: '/coffee/cold-coffee.png'
  },
  {
    id: 'cf-04', category: 'coffee', name: 'Hot Chocolate', price: 99, veg: true, mustTry: false,
    description: 'Rich, velvety hot chocolate made with premium cocoa.',
    image: '/coffee/hot-chocolate.png'
  },
  {
    id: 'cf-05', category: 'coffee', name: 'Green Tea', price: 59, veg: true, mustTry: false,
    description: 'Delicate, fragrant green tea — the perfect light refreshment.',
    image: '/coffee/green-tea.png'
  },
  {
    id: 'cf-06', category: 'coffee', name: 'Iced Americano', price: 139, veg: true, mustTry: false,
    description: 'Double espresso over ice with cold water — crisp and bold.',
    image: '/coffee/iced-americano.png'
  },
  {
    id: 'cf-07', category: 'coffee', name: 'Hot Milk', price: 29, veg: true, mustTry: false,
    description: 'Freshly steamed, comforting hot milk.',
    image: '/coffee/hot-milk.png'
  },
  {
    id: 'cf-08', category: 'coffee', name: 'Hot Water', price: 15, veg: true, mustTry: false,
    description: 'Clean hot water, served fresh.',
    image: '/coffee/hot-water.png'
  },
  {
    id: 'cf-09', category: 'coffee', name: 'Water', price: 15, veg: true, mustTry: false,
    description: 'Chilled mineral water.',
    image: '/coffee/water.png'
  },
  {
    id: 'cf-10', category: 'coffee', name: 'Vietnamese Iced Coffee', price: 179, veg: true, mustTry: true,
    description: 'Robust dark roast drip coffee layered over sweetened condensed milk and crushed ice — rich, sweet and intensely satisfying.',
    image: '/coffee/vietnamese-iced-coffee.png'
  },
  {
    id: 'cf-11', category: 'coffee', name: 'Cafe Mocha', price: 179, veg: true, mustTry: false,
    description: 'Espresso blended with rich dark chocolate and steamed milk — the perfect coffee-chocolate indulgence.',
    image: '/coffee/cafe-mocha.png'
  },
  {
    id: 'cf-12', category: 'coffee', name: 'Tiramisu Latte', price: 249, veg: true, mustTry: true,
    description: 'Espresso-soaked ladyfinger flavours swirled into a velvety latte with mascarpone cream and a dusting of cocoa.',
    image: '/coffee/tiramisu-latte.png'
  },

  // ─── SIGNATURE MATCHA ──────────────────────────────────────────────
  {
    id: 'mt-01', category: 'matcha', name: 'Matcha', price: 159, veg: true, mustTry: false,
    description: 'Ceremonial grade matcha, whisked to a smooth earthy froth.',
    image: '/matcha/matcha.png'
  },
  {
    id: 'mt-02', category: 'matcha', name: 'Iced Matcha', price: 179, veg: true, mustTry: false,
    description: 'Vibrant green matcha over ice — cool, refreshing and healthy.',
    image: '/matcha/iced-matcha.png'
  },
  {
    id: 'mt-03', category: 'matcha', name: 'Matcha Latte', price: 199, veg: true, mustTry: false,
    description: 'Smooth matcha with steamed milk for a creamy, dreamy latte.',
    image: '/matcha/matcha-latte.png'
  },
  {
    id: 'mt-04', category: 'matcha', name: 'Matcha Vanilla', price: 219, veg: true, mustTry: true,
    description: 'Earthy matcha meets sweet vanilla — a perfect balance.',
    image: '/matcha/matcha-vanilla.png'
  },
  {
    id: 'mt-05', category: 'matcha', name: 'Matcha Espresso', price: 249, veg: true, mustTry: false,
    description: 'Bold fusion of matcha and espresso — the ultimate energy boost.',
    image: '/matcha/matcha-espresso.png'
  },
  {
    id: 'mt-06', category: 'matcha', name: 'Strawberry Matcha', price: 269, veg: true, mustTry: true,
    description: 'Strawberry layered over creamy matcha — visually stunning.',
    image: '/matcha/strawberry-matcha.png'
  },
  {
    id: 'mt-07', category: 'matcha', name: 'Mango Matcha', price: 279, veg: true, mustTry: true,
    description: 'Sweet Alphonso mango purée swirled into ceremonial matcha — tropical meets earthy in one stunning sip.',
    image: '/matcha/mango-matcha.png'
  },

  // ─── FRIED FOODS ───────────────────────────────────────────────────
  {
    id: 'ff-01', category: 'fried', name: 'Veg Fingers', price: 89, veg: true, mustTry: false,
    description: 'Crispy golden vegetable fingers, lightly spiced and perfectly fried.',
    image: '/fried/veg-fingers.png'
  },
  {
    id: 'ff-02', category: 'fried', name: 'Chilli Garlic Balls', price: 89, veg: true, mustTry: false,
    description: 'Spicy, garlicky balls fried to golden perfection.',
    image: '/fried/chilli-garlic-balls.png'
  },
  {
    id: 'ff-03', category: 'fried', name: 'French Fries', price: 89, veg: true, mustTry: false,
    description: 'Classic golden fries — crispy outside, fluffy inside.',
    image: '/fried/french-fries.png'
  },
  {
    id: 'ff-04', category: 'fried', name: 'Peri Peri Fries', price: 119, veg: true, mustTry: false,
    description: 'Fries tossed in bold peri peri seasoning — smoky and irresistible.',
    image: '/fried/peri-peri-fries.png'
  },
  {
    id: 'ff-05', category: 'fried', name: 'Chicken Cheese Shots', price: 129, veg: false, mustTry: false,
    description: 'Crispy chicken bites stuffed with gooey melted cheese.',
    image: '/fried/chicken-cheese-shots.png'
  },
  {
    id: 'ff-06', category: 'fried', name: 'Chicken Popcorn', price: 149, veg: false, mustTry: false,
    description: 'Bite-sized crispy chicken pieces, seasoned and fried to perfection.',
    image: '/fried/chicken-popcorn.png'
  },
  {
    id: 'ff-07', category: 'fried', name: 'Chicken Strips', price: 149, veg: false, mustTry: false,
    description: 'Tender strips of chicken in a golden crispy crust.',
    image: '/fried/chicken-strips.png'
  },
  {
    id: 'ff-08', category: 'fried', name: 'Chicken Wings', price: 179, veg: false, mustTry: true,
    description: 'Juicy wings tossed in our signature sauce — bold flavour in every bite.',
    image: '/fried/chicken-wings.png'
  },
  {
    id: 'ff-09', category: 'fried', name: 'Chicken Lollipop', price: 189, veg: false, mustTry: false,
    description: 'Succulent chicken lollipops, marinated and fried to a crisp.',
    image: '/fried/chicken-lollipop.png'
  },
  {
    id: 'ff-10', category: 'fried', name: 'Fish and Chips', price: 189, veg: false, mustTry: false,
    description: 'Beer-battered fish fillet served with golden fries.',
    image: '/fried/fish-and-chips.png'
  },
  {
    id: 'ff-11', category: 'fried', name: 'Veg Loaded Fries', price: 199, veg: true, mustTry: false,
    description: 'Crispy fries loaded with veggies, sauce and toppings.',
    image: '/fried/veg-loaded-fries.png'
  },
  {
    id: 'ff-12', category: 'fried', name: 'Shrimp & Fries', price: 229, veg: false, mustTry: true,
    description: 'Juicy fried shrimp paired with crispy fries — a seaside delight.',
    image: '/fried/shrimp-and-fries.png'
  },
  {
    id: 'ff-13', category: 'fried', name: 'Loaded Fries', price: 239, veg: false, mustTry: true,
    description: 'Fries piled high with toppings — cheese, sauces and more.',
    image: '/fried/loaded-fries.png'
  },
  {
    id: 'ff-14', category: 'fried', name: 'Special Loaded Fries', price: 259, veg: false, mustTry: true,
    description: "Our signature loaded fries with premium toppings and chef's special sauce.",
    image: '/fried/special-loaded-fries.png'
  },

  // ─── PIZZA ─────────────────────────────────────────────────────────
  {
    id: 'pz-01', category: 'pizza', name: 'Veg Pizza', price: 209, veg: true, mustTry: false,
    description: 'Classic thin crust with onion, chilli and capsicum.',
    image: '/pizza/veg-pizza.png', sub: 'Onion · Chilli · Capsicum'
  },
  {
    id: 'pz-02', category: 'pizza', name: 'Paneer Aroma', price: 219, veg: true, mustTry: false,
    description: 'Aromatic pizza with paneer, chilli, onion and black olives.',
    image: '/pizza/paneer-aroma.png', sub: 'Paneer · Chilli · Onion · Black Olives'
  },
  {
    id: 'pz-03', category: 'pizza', name: 'Golden Delight', price: 219, veg: true, mustTry: false,
    description: 'Cheesy golden pizza with sweet corn, onion and capsicum.',
    image: '/pizza/golden-delight.png', sub: 'Onion · Corn · Capsicum'
  },
  {
    id: 'pz-04', category: 'pizza', name: 'Chicken Tangy Pizza', price: 249, veg: false, mustTry: false,
    description: 'Tangy pizza with baked chicken, onion and capsicum.',
    image: '/pizza/chicken-tangy-pizza.png', sub: 'Baked Chicken · Onion · Capsicum'
  },
  {
    id: 'pz-05', category: 'pizza', name: 'Bolognese Pizza', price: 299, veg: false, mustTry: false,
    description: 'Hearty smashed chicken pizza with onion and red paprika.',
    image: '/pizza/bolognese-pizza.png', sub: 'Smashed Chicken · Onion · Red Paprika'
  },
  {
    id: 'pz-06', category: 'pizza', name: 'French Fries Pizza', price: 299, veg: false, mustTry: false,
    description: 'Pizza topped with crispy fries, chicken/paneer, red paprika.',
    image: '/pizza/french-fries-pizza.png', sub: 'French Fries · Baked Chicken/Paneer · Red Paprika'
  },
  {
    id: 'pz-07', category: 'pizza', name: 'Chicken Cheese Burst', price: 329, veg: false, mustTry: false,
    description: 'Oozy cheese burst with jalapeños, chicken and black olives.',
    image: '/pizza/chicken-cheese-burst.png', sub: 'Jalapeños · Chicken · Black Olives · Red Paprika'
  },
  {
    id: 'pz-08', category: 'pizza', name: 'Fried Chicken Pizza', price: 349, veg: false, mustTry: false,
    description: 'Best-seller: crispy fried chicken, red paprika and onion.',
    image: '/pizza/fried-chicken-pizza.png', sub: 'Fried Chicken · Red Paprika · Onion'
  },

  // ─── BURGERS ───────────────────────────────────────────────────────
  {
    id: 'bg-01', category: 'burgers', name: 'Veg Burger', price: 149, veg: true, mustTry: false,
    description: 'Fresh crispy veg patty with crunchy veggies and house sauce.',
    image: '/burgers/veg-burger.png'
  },
  {
    id: 'bg-02', category: 'burgers', name: 'Chicken Burger', price: 159, veg: false, mustTry: false,
    description: 'Juicy chicken patty with fresh veggies and classic burger sauce.',
    image: '/burgers/chicken-burger.png'
  },
  {
    id: 'bg-03', category: 'burgers', name: 'Paneer Burger', price: 199, veg: true, mustTry: true,
    description: 'Smoky grilled paneer with lettuce, tomato and tangy sauce.',
    image: '/burgers/paneer-burger.png'
  },
  {
    id: 'bg-04', category: 'burgers', name: 'Fried Chicken Burger', price: 199, veg: false, mustTry: true,
    description: 'Crispy fried chicken fillet with fresh slaw and house sauce.',
    image: '/burgers/fried-chicken-burger.png'
  },
  {
    id: 'bg-05', category: 'burgers', name: 'Egg Burger', price: 129, veg: true, mustTry: false,
    description: 'Fluffy fried egg with melted cheese, fresh lettuce and house sauce in a toasted brioche bun.',
    image: '/burgers/egg-burger.png'
  },

  // ─── SMASH BURGERS (sub-category under Burgers) ────────────────────
  {
    id: 'sb-01', category: 'burgers', name: 'Chicken Patty Burger', price: 199, veg: false, mustTry: false,
    description: 'Smashed crispy chicken patty with melted cheese and special sauce.',
    image: '/burgers/chicken-patty-burger.png', sub: 'Smash Burger'
  },
  {
    id: 'sb-02', category: 'burgers', name: 'Double Patty Burger', price: 229, veg: false, mustTry: false,
    description: 'Two smashed patties, double cheese, double the flavour.',
    image: '/burgers/double-patty-burger.png', sub: 'Smash Burger'
  },

  // ─── WRAPS ─────────────────────────────────────────────────────────
  {
    id: 'wr-01', category: 'wraps', name: 'Veg Wrap', price: 139, veg: true, mustTry: false,
    description: 'Fresh veggies and sauce in a soft flour tortilla.',
    image: '/wraps/veg-wrap.png'
  },
  {
    id: 'wr-02', category: 'wraps', name: 'Paneer Wrap', price: 159, veg: true, mustTry: false,
    description: 'Spiced grilled paneer with crisp veggies in a warm wrap.',
    image: '/wraps/paneer-wrap.png'
  },
  {
    id: 'wr-03', category: 'wraps', name: 'Fried Chicken Wrap', price: 159, veg: false, mustTry: false,
    description: 'Crispy fried chicken strips with slaw and chipotle mayo.',
    image: '/wraps/fried-chicken-wrap.png'
  },
  {
    id: 'wr-04', category: 'wraps', name: 'Jumbo Chicken Wrap', price: 189, veg: false, mustTry: false,
    description: 'Oversized wrap packed with grilled chicken, veggies and dressing.',
    image: '/wraps/jumbo-chicken-wrap.png'
  },
  {
    id: 'wr-05', category: 'wraps', name: 'French Fries Wrap', price: 199, veg: false, mustTry: false,
    description: 'Crispy fries and chicken wrapped up — a flavour explosion.',
    image: '/wraps/french-fries-wrap.png'
  },

  // ─── BOWLS ─────────────────────────────────────────────────────────
  {
    id: 'bw-01', category: 'bowls', name: 'Zingy Special Bowl', price: 199, veg: false, mustTry: false,
    description: 'Crispy French fries and golden chicken popcorn tossed with fresh vegetables in our signature in-house spicy sauce — bold, vibrant and utterly satisfying.',
    image: '/bowls/zingy-special-bowl.png'
  },
  {
    id: 'bw-02', category: 'bowls', name: 'Amor Fati Special Bowl', price: 229, veg: false, mustTry: true,
    description: 'Crispy French fries and golden chicken popcorn tossed with fresh vegetables in our signature in-house creamy sauce — indulgent, rich and deeply comforting.',
    image: '/bowls/amor-fati-special-bowl.png'
  },

  // ─── SHAKES ────────────────────────────────────────────────────────
  {
    id: 'sh-01', category: 'shakes', name: 'Oreo Shake', price: 109, veg: true, mustTry: false,
    description: 'Thick creamy milkshake blended with crushed Oreo cookies.',
    image: '/shakes/oreo-shake.png'
  },
  {
    id: 'sh-02', category: 'shakes', name: 'KitKat Shake', price: 109, veg: true, mustTry: false,
    description: 'Silky smooth shake with crunchy KitKat pieces blended in.',
    image: '/shakes/kitkat-shake.png'
  },
  {
    id: 'sh-03', category: 'shakes', name: 'Vanilla Shake', price: 109, veg: true, mustTry: false,
    description: 'Classic creamy vanilla milkshake — smooth, sweet and timeless.',
    image: '/shakes/vanilla-shake.png'
  },
  {
    id: 'sh-04', category: 'shakes', name: 'Cold Coffee Shake', price: 119, veg: true, mustTry: false,
    description: 'Rich chilled coffee milkshake — the perfect afternoon pick-me-up.',
    image: '/shakes/cold-coffee-shake.png'
  },
  {
    id: 'sh-05', category: 'shakes', name: 'Caramel Shake', price: 129, veg: true, mustTry: true,
    description: 'Buttery caramel swirled into a thick, creamy milkshake.',
    image: '/shakes/caramel-shake.png'
  },
  {
    id: 'sh-06', category: 'shakes', name: 'Strawberry Shake', price: 139, veg: true, mustTry: false,
    description: 'Vibrant fresh strawberry blended into a creamy pink milkshake.',
    image: '/shakes/strawberry-shake.png'
  },
  {
    id: 'sh-07', category: 'shakes', name: 'Cookies N Cream Shake', price: 139, veg: true, mustTry: true,
    description: 'Vanilla ice cream with chunky cookie bits — irresistible.',
    image: '/shakes/cookies-n-cream-shake.png'
  },
  {
    id: 'sh-08', category: 'shakes', name: 'Biscoff Shake', price: 149, veg: true, mustTry: true,
    description: 'Creamy shake swirled with Biscoff spread — warm spice meets cool cream.',
    image: '/shakes/biscoff-shake.png'
  },
  {
    id: 'sh-09', category: 'shakes', name: 'Brownie Blast Shake', price: 149, veg: true, mustTry: true,
    description: 'Fudgy brownie blended into an epic shake — a dessert in a glass.',
    image: '/shakes/brownie-blast-shake.png'
  },
  {
    id: 'sh-10', category: 'shakes', name: 'Peanut Buttery Oreo', price: 179, veg: true, mustTry: true,
    description: 'Creamy peanut butter blended with crushed Oreos into a thick, indulgent milkshake — nutty, chocolatey perfection.',
    image: '/shakes/peanut-buttery-oreo.png'
  },
  {
    id: 'sh-11', category: 'shakes', name: 'Double Choco Chip Flake Shake', price: 199, veg: true, mustTry: true,
    description: 'A rich, indulgent blend of chocolate swirls and double choco chip flakes, crowned with whipped cream — pure chocolate heaven in a glass.',
    image: '/shakes/double-choco-chip-flake-shake.png'
  },

  // ─── BROWNIE ───────────────────────────────────────────────────────
  {
    id: 'br-01', category: 'brownie', name: 'Plain Brownie', price: 79, veg: true, mustTry: false,
    description: 'Classic fudgy chocolate brownie — simple, indulgent and perfect.',
    image: '/brownie/plain-brownie.png'
  },
  {
    id: 'br-02', category: 'brownie', name: 'Triple Chocolate Brownie', price: 109, veg: true, mustTry: false,
    description: 'Triple choc — dark, milk and white chocolate in one epic brownie.',
    image: '/brownie/triple-chocolate-brownie.png'
  },
  {
    id: 'br-03', category: 'brownie', name: 'Almond Brownie', price: 129, veg: true, mustTry: false,
    description: 'Rich chocolate brownie studded with crunchy almonds.',
    image: '/brownie/almond-brownie.png'
  },
  {
    id: 'br-04', category: 'brownie', name: 'Cinnamon Brownie', price: 129, veg: true, mustTry: false,
    description: 'Warm cinnamon spice woven into a gooey chocolate brownie.',
    image: '/brownie/cinnamon-brownie.png'
  },
  {
    id: 'br-05', category: 'brownie', name: 'Strawberry Brownie', price: 149, veg: true, mustTry: true,
    description: 'Fudgy brownie with fresh strawberry coulis — a fruity choc dream.',
    image: '/brownie/strawberry-brownie.png'
  },

  // ─── CHOCO SAUCE DIPS ──────────────────────────────────────────────
  {
    id: 'cd-02', category: 'choco-dips', name: 'Marshmallow Dip', price: 189, veg: true, mustTry: false,
    description: 'Soft marshmallow swirled into warm chocolate — dreamy.',
    image: '/choco-dips/marshmallow-dip.png'
  },
  {
    id: 'cd-03', category: 'choco-dips', name: 'Strawberry Dip', price: 199, veg: true, mustTry: false,
    description: 'Fresh strawberry sauce with rich chocolate — a classic pairing.',
    image: '/choco-dips/strawberry-dip.png'
  },
  {
    id: 'cd-04', category: 'choco-dips', name: 'Brownie Smashed Strawberry Dip', price: 229, veg: true, mustTry: false,
    description: 'Smashed brownie with strawberries and chocolate sauce.',
    image: '/choco-dips/brownie-smashed-strawberry-dip.png'
  },

  // ─── COOLERS ───────────────────────────────────────────────────────
  {
    id: 'cl-01', category: 'coolers', name: 'Virgin Cooler', price: 89, veg: true, mustTry: false,
    description: 'Fresh juices and soda blend — the ultimate thirst quencher.',
    image: '/coolers/virgin-cooler.png'
  },
  {
    id: 'cl-02', category: 'coolers', name: 'Blue Ocean', price: 99, veg: true, mustTry: false,
    description: 'Vibrant blue cooler with a tropical citrus twist.',
    image: '/coolers/blue-ocean.png'
  },
  {
    id: 'cl-03', category: 'coolers', name: 'Green Apple', price: 99, veg: true, mustTry: false,
    description: 'Crisp green apple cooler with a hint of mint — tangy and reviving.',
    image: '/coolers/green-apple.png'
  },
  {
    id: 'cl-04', category: 'coolers', name: 'Mint Cooler', price: 99, veg: true, mustTry: false,
    description: 'Fresh mint, lime and soda — hits the spot every time.',
    image: '/coolers/mint-cooler.png'
  },
];

export const comboOffers = [
  {
    name: 'Anything For You Combo',
    items: 'Any Pizza + Any 2 Shakes + Any Burger + Any 2 Brownies + Any Wrap',
    price: 899,
  },
  {
    name: 'Main Character Meal',
    items: 'Tangy Chicken / Paneer Pizza + Oreo / KitKat Shake + Chicken / Veg Burger + Triple Chocolate Brownie',
    price: 499,
  },
];
