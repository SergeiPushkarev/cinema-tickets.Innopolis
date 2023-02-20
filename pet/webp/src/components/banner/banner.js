export function banner ({text}){
    const wrapper = document.createElement('div')
    const header = document.createElement('h1')
    header.textContent = text
    wrapper.append(header)
    return wrapper
}