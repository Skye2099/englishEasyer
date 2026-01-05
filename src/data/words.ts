export interface Word {
  word: string;
  annotation: string;
  pronunciation?: string; // 可选的音标
}

export interface WordCategory {
  name: string;
  words: Word[];
}

// 基础3000词汇
export const basicWords: Word[] = [
  { word: 'apple', annotation: '苹果 - A fruit that is typically red or green.' },
  { word: 'aaa', annotation: 'test.' },
  { word: 'book', annotation: '书籍 - A written or printed work consisting of pages.' },
  { word: 'computer', annotation: '计算机 - An electronic device for storing and processing data.' },
  { word: 'dog', annotation: '狗 - A domesticated carnivorous mammal.' },
  { word: 'elephant', annotation: '大象 - A large herbivorous mammal with a trunk.' },
  { word: 'family', annotation: '家庭 - A group of people related by blood or marriage.' },
  { word: 'garden', annotation: '花园 - A piece of ground for growing flowers, fruits, or vegetables.' },
  { word: 'house', annotation: '房子 - A building for people to live in.' },
  { word: 'internet', annotation: '互联网 - A global computer network providing information and communication facilities.' },
  { word: 'knowledge', annotation: '知识 - Facts, information, and skills acquired through experience or education.' },
  { word: 'language', annotation: '语言 - A system of communication used by a particular country or community.' },
  { word: 'mountain', annotation: '山 - A large natural elevation of the earth\'s surface.' },
  { word: 'nature', annotation: '自然 - The physical world collectively, including plants, animals, and landscapes.' },
  { word: 'ocean', annotation: '海洋 - A very large expanse of sea.' },
  { word: 'people', annotation: '人们 - Human beings in general or considered collectively.' },
];

// 词组搭配
export const phrases: Word[] = [
  { word: 'break down', annotation: '崩溃；分解 - To stop functioning or to separate into parts.' },
  { word: 'carry on', annotation: '继续 - To continue doing something.' },
  { word: 'come across', annotation: '偶然遇见 - To find or meet someone or something by chance.' },
  { word: 'get along', annotation: '相处融洽 - To have a friendly relationship with someone.' },
  { word: 'give up', annotation: '放弃 - To stop trying to do something.' },
  { word: 'look forward to', annotation: '期待 - To feel excited about something that is going to happen.' },
  { word: 'make up', annotation: '编造；化妆；和好 - To invent a story or to reconcile after a disagreement.' },
  { word: 'put off', annotation: '推迟 - To delay something until a later time.' },
  { word: 'run into', annotation: '偶然遇见 - To meet someone unexpectedly.' },
  { word: 'take care of', annotation: '照顾 - To look after someone or something.' },
  { word: 'turn down', annotation: '拒绝；调低 - To refuse an offer or to reduce the volume or intensity.' },
  { word: 'work out', annotation: '解决；锻炼 - To find a solution or to exercise.' },
];

// 易错发音
export const pronunciation: Word[] = [
  { word: 'throughout', annotation: '自始至终 - In every part of; during the whole period of.', pronunciation: '/θruːˈaʊt/' },
  { word: 'thorough', annotation: '彻底的 - Complete with regard to every detail.', pronunciation: '/ˈθʌrə/' },
  { word: 'through', annotation: '通过 - Moving in one side and out of the other.', pronunciation: '/θruː/' },
  { word: 'thought', annotation: '想法 - An idea or opinion produced by thinking.', pronunciation: '/θɔːt/' },
  { word: 'receipt', annotation: '收据 - A written acknowledgment of having received money or goods.', pronunciation: '/rɪˈsiːt/' },
  { word: 'comfortable', annotation: '舒适的 - Providing physical ease and relaxation.', pronunciation: '/ˈkʌmftəbl/' },
  { word: 'February', annotation: '二月 - The second month of the year.', pronunciation: '/ˈfebrueri/' },
  { word: 'Wednesday', annotation: '星期三 - The day of the week before Thursday.', pronunciation: '/ˈwenzdeɪ/' },
  { word: 'chaos', annotation: '混乱 - Complete disorder and confusion.', pronunciation: '/ˈkeɪɒs/' },
  { word: 'choir', annotation: '合唱团 - An organized group of singers.', pronunciation: '/ˈkwaɪə/' },
  { word: 'debris', annotation: '碎片 - Scattered pieces of waste or remains.', pronunciation: '/ˈdebriː/' },
  { word: 'epitome', annotation: '典范 - A perfect example of a particular quality or type.', pronunciation: '/ɪˈpɪtəmi/' },
];

// 所有分类
export const categories: WordCategory[] = [
  { name: '基础3000词汇', words: basicWords },
  { name: '词组搭配', words: phrases },
  { name: '易错发音', words: pronunciation },
];
