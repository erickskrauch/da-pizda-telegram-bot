const segmenter = new Intl.Segmenter(['ru', 'en']);

export function splitByGlyph(str: string): Array<string> {
    return Array.from(segmenter.segment(str)).map(({ segment }) => segment);
}

const normalizationMap = new Map<string, string>();
// Please note that this dictionary is adjusted to needs of this project and doesn't match Unicode confusion dictionary
const normalizationDictionary: Record<string, string> = {
    // Latin
    'D': '🄓Ꭰ🄳𝔡𝖉𝔻𝗗𝘋𝙳𝐷𝓓𝐃𝑫𝕯𝖣𝔇𝘿ꭰⅅ𝒟ꓓ🅳🅓ⒹＤƉᗪƊÐԺᴅᴰↁḊĐÞⅮᗞᑯĎḌḐḒḎᗫᗬᗟᗠᶛᴆ🇩Δ',
    'd': 'Ꮷ𝔡𝖉ᑯꓒ𝓭ᵭ₫ԃⓓｄḋďḍḑḓḏđƌɖɗᵈ⒟ⅾᶁᑺᑻᑼᑽᒄᑰᑱᶑ𝕕𝖽𝑑𝘥𝒅𝙙𝐝𝗱𝚍ⅆ𝒹ʠժδ',
    'A': '𝑨𝔄ᗄ𝖠𝗔ꓯ𝞐🄐🄰Ꭿ𐊠𝕬𝜜𝐴ꓮᎪ𝚨ꭺ𝝖🅐Å∀Ɐ🇦₳🅰𝒜𝘈𝐀𝔸ǺᗅⒶＡΑᾋᗩĂÃÅǍȀȂĀȺĄʌΛλƛᴀᴬልÄₐᕱǞΆẠẢẦẨẬẮẰẲẴẶᾸᾹᾺΆᾼᾈᾉᾊᾌᾍᾎᾏἈἉἊἋἌἍἎἏḀȦǠÀÁÂẤẪ𝛢𝓐𝙰𝘼ᗩÆǢ𐌀A̱A̧Ą̇A҃',
    'a': '∂⍺@ⓐձǟªᵃᶏ⒜ɒａαȃȁคǎმäɑāɐąᾄẚạảǡầẵḁȧãåάὰάăẩằẳặᾀᾁᾂᾃᾅᾆᾰᾱᾲᾳᾴᶐᾶᾷἀἁἂἃἄἅἆἇᾇậắàáâấẫǻⱥ𝐚𝑎𝒂𝒶𝓪𝔞𝕒𝖆𝖺𝗮𝘢𝙖𝚊𝛂𝛼𝜶𝝰𝞪⍶æǣa̱a̧ą̇a҃',
    // Cyrillic
    'Д': 'Д̌Д́Д̈Д̣Д̆ԀД̓Д̀Д̨ЂԂꚀꙢД҄',
    'д': 'д̌д́д̈д̣д̆ԁд̓д̀д̨ђԃꚁꙣд҄',
    'А': 'А̀А̂А̄ӒӐА̊А̃Ӓ̄ӔА̨ѦꙘА҃А̇',
    'а': 'а́а̂а̄ӓӑа̊а̃ӓ̄ӕа̨ѧꙙа҃а̇',
};
for (const normalLetter in normalizationDictionary) {
    for (const confusingChar of splitByGlyph(normalizationDictionary[normalLetter])) {
        normalizationMap.set(confusingChar, normalLetter);
    }
}

export function normalizeString(str: string): string {
    let result = '';
    for (const char of splitByGlyph(str)) {
        result += normalizationMap.get(char) || char;
    }

    return result;
}
