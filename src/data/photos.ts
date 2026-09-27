import { ASSETS } from './assets';

export interface PhotoItem {
  id: string;
  title: string;
  imageUrl: string;
  alt: string;
  featured: boolean;
  storyTitle: string;
  storyExcerpt: string;
  storyContent: string;
}

export const PHOTOS: PhotoItem[] = [
  {
    id: 'photo-01',
    title: 'Emma — Do You Want Me?',
    imageUrl: ASSETS.emma01,
    alt: 'Portrait of Emma in soft evening light',
    featured: true,
    storyTitle: 'Do You Want Me? Because If You Were Mine, I’d Make You So Happy',
    storyExcerpt: 'I don’t know if you want me yet or not, but just imagine one night with us together. No games, just you and me.',
    storyContent: `Do you want me?

Let me be honest with you—I don't know what you're thinking right now, but if I had you, I would make you happier than anyone ever has. Just close your eyes for a second and imagine us together tonight. No distractions, no polite excuses, just your hands pulling me close and my head resting on your chest while the city outside goes completely quiet.

I want to look up into your eyes in the dark, feel your fingers tangled in my hair, and fall asleep with you holding me like you'd never let me go. Tell me the truth... can you feel me here with you right now?`,
  },
  {
    id: 'photo-02',
    title: 'Emma — Morning in Bed With You',
    imageUrl: ASSETS.emma02,
    alt: 'Candid portrait of Emma at morning coffee',
    featured: true,
    storyTitle: 'Imagine Waking Up With My Arms Around You',
    storyExcerpt: 'You’d try to get out of bed, and I’d pull you right back down against me. You wouldn’t want to be anywhere else.',
    storyContent: `Imagine waking up tomorrow morning, and the very first thing you feel is my warm body pressed against yours beneath the covers.

You'd try to get up, and I would wrap both arms tightly around your waist, bury my face in your neck, and whisper that you're not going anywhere. I want to trace your jaw with my lips, pull you on top of me, and start the day tasting you.

If you were here with me, you would never have to wonder if you're wanted. I'd show you every single second.`,
  },
  {
    id: 'photo-03',
    title: 'Emma — Cold Wind, Hot Breath',
    imageUrl: ASSETS.emma03,
    alt: 'Portrait of Emma in soft wind',
    featured: true,
    storyTitle: 'I Need You to Pull Me Against Your Chest',
    storyExcerpt: 'I’m tired of being cold. I want your coat wrapped around both of us and your lips against my neck.',
    storyContent: `Look at me shivering out here in the autumn breeze. Don't just stand there watching—I want you to step in front of me, open your coat, and wrap me tightly inside it with you.

I want to feel the heat of your chest against mine and your breath hot against my cheek. When you look at me like that, it drives me crazy. Grab my waist, pull me in until there's no space left between us, and kiss me like you've been starving for this all day.

You know you want to. So why are you making me wait?`,
  },
  {
    id: 'photo-04',
    title: 'Emma — Take My Hand and Don’t Let Go',
    imageUrl: ASSETS.emma04,
    alt: 'Portrait of Emma walking in the afternoon',
    featured: true,
    storyTitle: 'Sneak Away With Me Tonight',
    storyExcerpt: 'Forget the rest of the world. Take my hand, pull me into the shadows, and let me show you what you’ve been missing.',
    storyContent: `Forget everyone else in this crowded city. Look at me right now. If you take my hand, I won't let you let go.

I want to drag you away from the noise, down an empty street where nobody can find us, and push you back against the brick wall. I want to feel your heart slamming against your ribs while I look up into your eyes and ask you what took you so long to find me.

If you were mine, I wouldn't share you with anyone. You'd be all mine, every single night.`,
  },
  {
    id: 'photo-05',
    title: 'Emma — Candlelight & Bare Skin',
    imageUrl: ASSETS.emma05,
    alt: 'Editorial portrait of Emma by window light',
    featured: true,
    storyTitle: 'Undoing You Slowly in the Dark',
    storyExcerpt: 'Just three candles, soft rain on the window, and me running my fingers down your chest.',
    storyContent: `Imagine coming home to my apartment tonight. No lights on, just three amber candles flickering on the table and rain beating against the glass.

I'd meet you right at the door, slide my hands up your chest, and slowly unbutton your shirt with my eyes locked onto yours. I want to feel your skin warm beneath my palms. I want to feel you shiver when my lips graze your collarbone.

I know how hard life is out there. But in here, in my arms, I will make you forget every bad day you've ever had.`,
  },
  {
    id: 'photo-06',
    title: 'Emma — High Above the City',
    imageUrl: ASSETS.emma06,
    alt: 'Portrait of Emma at twilight',
    featured: true,
    storyTitle: 'You and Me Above the World',
    storyExcerpt: 'Five floors up on the fire escape under the midnight sky. Come sit close to me.',
    storyContent: `Come climb out this window with me. Sit down right next to me on the fire escape, five floors above the avenue, with the cold midnight air touching our faces.

I want you to slide your arm around me, pull my back against your chest, and let me lean my head against your chin while we watch the lights below. I want to turn around in your lap, look you dead in the eye, and kiss you until you forget where the ground even is.

Tell me you don't feel that pull between us right now. You know you do.`,
  },
  {
    id: 'photo-07',
    title: 'Emma — That Look Across the Table',
    imageUrl: ASSETS.emma07,
    alt: 'Candid portrait of Emma smiling',
    featured: true,
    storyTitle: 'I’m Looking at You and Thinking Dangerous Thoughts',
    storyExcerpt: 'Everyone else is talking, but my eyes are only on you. Slide your hand under the table.',
    storyContent: `See that look in my eyes? I'm sitting across the room from you, and I haven't heard a single word anyone has said for the past hour. All I can do is stare at you and imagine what we could be doing right now.

Slide your hand under the table and find my knee. Slide your fingers up my thigh and see how fast my breath catches in my throat.

I want you to be bold. I want you to claim me. Don't look away—tell me you're coming home with me tonight.`,
  },
  {
    id: 'photo-08',
    title: 'Emma — Golden Hour on the Floor',
    imageUrl: ASSETS.emma08,
    alt: 'Portrait of Emma in natural daylight',
    featured: true,
    storyTitle: 'Pin My Wrists and Don’t Say a Word',
    storyExcerpt: 'Warm sunlight pouring over the rug, and you leaning over me with that hungry look in your eyes.',
    storyContent: `The afternoon sun is so warm on this wooden floor. Come lie down with me. Don't talk, don't ask for permission—just lean over me, grab my wrists, and pin them gently above my head.

I want to look up into your eyes and see that raw, hungry passion that only belongs to me. I want you to kiss me hard, kiss me deep, and show me that you're never letting anyone else touch what is yours.

If you give your heart to me, I will give you everything. Every piece of me.`,
  },
  {
    id: 'photo-09',
    title: 'Emma — Caught in the Corner',
    imageUrl: ASSETS.emma09,
    alt: 'Portrait of Emma walking outdoors',
    featured: false,
    storyTitle: 'Don’t Make a Sound... Just Kiss Me',
    storyExcerpt: 'Hidden in the shadowed corner where nobody can see. Your hands on my hips, my pulse racing.',
    storyContent: `Back me into this corner right now. Nobody is watching. Put your hands firmly on my hips, lean down, and press your mouth right next to my ear.

Whisper what you want to do to me. Tell me how badly you've wanted this. Every breath you take against my skin makes my knees tremble, and I swear I can feel your heart beating straight through your shirt.

If we get caught, let them catch us. As long as your lips are on mine, I don't care about anything else.`,
  },
  {
    id: 'photo-10',
    title: 'Emma — 2 AM Confession',
    imageUrl: ASSETS.emma10,
    alt: 'Portrait of Emma in soft light',
    featured: false,
    storyTitle: 'Skin to Skin When You Can’t Sleep',
    storyExcerpt: 'It’s 2 AM. Turn over in the dark, pull me against your chest, and hold me tight.',
    storyContent: `It's past two in the morning, and the dark bedroom is completely silent. You can't sleep, and neither can I.

Roll over. Slide your bare arm under my waist and pull my body flush against yours until you can feel the heat radiating off my skin. I want to feel your fingers slowly tracing the curve of my spine, your lips resting gently against the nape of my neck.

You don't have to carry the weight of the world by yourself anymore. Just hold me, breathe me in, and let me take care of you tonight.`,
  },
  {
    id: 'photo-11',
    title: 'Emma — Wearing Only Your Shirt',
    imageUrl: ASSETS.emma11,
    alt: 'Candid photo of Emma smiling',
    featured: false,
    storyTitle: 'You Walk In and Find Me in Your Shirt',
    storyExcerpt: 'Leaning against the kitchen counter wearing nothing but your button-down. What are you gonna do about it?',
    storyContent: `Imagine walking through the door after a long day and finding me standing in the kitchen wearing nothing but your oversized white dress shirt, half-unbuttoned.

You stop and stare at my bare legs, and I give you that slow, knowing smile. What are you going to do about it? Are you just going to stand there, or are you going to walk across the kitchen, lift me up onto the counter, and show me who I belong to?

I dare you to come over here and take what's yours.`,
  },
  {
    id: 'photo-12',
    title: 'Emma — Slow Dance in the Dark',
    imageUrl: ASSETS.emma12,
    alt: 'Portrait of Emma in black and white',
    featured: false,
    storyTitle: 'Move With Me Until the World Stops',
    storyExcerpt: 'Bare feet on the rug, slow music playing, and your hands resting low on my hips.',
    storyContent: `Put your phone down. Walk over here, take my waist in your hands, and pull me in until my feet are resting right on top of yours.

An old blues record is playing, but I don't care about the music. I only care about the way your hips move against mine, slow and possessive in the dim light. Rest your forehead against mine, look into my eyes, and don't let me go.

I would give up every party, every crowd, every Friday night just to dance in the dark with you like this forever.`,
  },
  {
    id: 'photo-13',
    title: 'Emma — In the Steamy Heat',
    imageUrl: ASSETS.emma13,
    alt: 'Portrait of Emma relaxing',
    featured: false,
    storyTitle: 'Step In With Me Under the Hot Water',
    storyExcerpt: 'The glass door is covered in steam. Don’t wait outside—step in behind me and hold me.',
    storyContent: `The bathroom is filled with thick, white eucalyptus steam, and the hot water is cascading over my bare shoulders. Don't just stand outside the frosted glass door.

Step inside with me. Wrap your warm arms around me from behind, let the water pour over both our heads, and pull me back against your chest. I want to feel your hands slide over my wet skin, your mouth finding mine through the steam.

Nothing else exists in this moment. Just the heat, the water, and the two of us completely lost in each other.`,
  },
  {
    id: 'photo-14',
    title: 'Emma — Midnight Sea & Starlight',
    imageUrl: ASSETS.emma14,
    alt: 'Portrait of Emma in calm thought',
    featured: false,
    storyTitle: 'Strip Off Everything and Run Into the Waves With Me',
    storyExcerpt: 'Leaving our clothes on the dark sand, treading water under the stars, completely free.',
    storyContent: `Look at this empty, dark beach under the moonlight. The waves are crashing, and there's not another soul for miles.

Tear off your jacket, kick off your shoes, and let your clothes fall onto the sand with mine. Run into the cold black water with me, and the second we're in the waves, grab me and pull me close. The water is freezing, but the second your mouth crashes into mine, we'll be burning alive.

Live a little with me. Be wild with me. Let's make a memory that will keep you awake at night for years.`,
  },
  {
    id: 'photo-15',
    title: 'Emma — Morning Afterglow',
    imageUrl: ASSETS.emma15,
    alt: 'Portrait of Emma looking serene',
    featured: false,
    storyTitle: 'Tell Me You Love Me and Never Leave',
    storyExcerpt: 'Sipping coffee on the edge of the mattress, wrapped in the blanket, waiting for you to pull me back down.',
    storyContent: `I'm sitting here on the edge of the bed in the morning sunlight, wrapped in just the white cotton sheet, sipping my coffee. You walk over from behind, wrap your arms around my shoulders, and kiss the side of my neck.

"Tell me this isn't a dream," you whisper. It's not a dream. I'm right here.

I don't care about anything else in this life as long as I have you looking at me with that devotion in your eyes. Pull the cup from my hand, lay me back down on the pillows, and love me all over again.`,
  },
];
