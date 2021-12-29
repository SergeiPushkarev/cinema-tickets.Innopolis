const cats = {
    abyssinian: '😸',
    'american-bobtail' : '🐱',
    'siam': '🙀',
    'bombay' : '😼'
    };
for (const breed in cats) {
    if (breed.length > 4) {
        console.log(cats[breed])
    }
}