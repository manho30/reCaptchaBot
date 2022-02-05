// regex check is the name is arab. 
const isarabic = (text) => {
    const regex = new RegExp(
    "[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufc3f]|[\ufe70-\ufefc]");
    return regex.test(text);
}

const nameIsArabic = (user) => {
    const name = user.first_name
    return isarabic(name)
} 
