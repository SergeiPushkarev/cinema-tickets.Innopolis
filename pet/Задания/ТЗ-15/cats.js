const cats = {
    abyssinian: '😸',
    'american-bobtail' : '🐱',
    'siam': '🙀',
    'bombay' : '😼'
    };
for (const breed of Object.keys(cats)) {
    if (breed.length > 4) {
    console.log(cats[breed])
    }
}