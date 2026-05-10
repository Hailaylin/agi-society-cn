---
comments: true
---

# Amount of Information

[英文原文↗](https://cis.temple.edu/~pwang/GTI-book/GTI-TOPICS/GTI-AmountOfInformation.html)

Through communication, a system may obtain knowledge about the other system, the environment, as well as the communication process itself. As an abstraction, we say that "information" is "transferred" from the sender to the receiver.

The Information Theory of Claude Shannon (1948) provides a detailed analysis for communication at the signal level. The theory defines a measure of information, basically using the number of bits needed for the storage or communication of a sequence of signals carrying the information. Though this theory makes great contribution to signal communication, it says little about the content and effect of the information.

We may measure the amount of information in a given message in three levels. In the following I'll bring the labels from linguistics:

At the _syntactic_ level, a message is seen as a sequence of symbols (actually signals, since their meaning is ignored). Here the "amount of information" is basically what Shannon suggested: the number of bits needed to code the message, so "more information" means longer message.

At the _semantic_ level, a message is supposed to carry new information to the receiver, so intuitively, the "amount of information" is determined by how novel the message is. If the content of the message is known or fully anticipated, it contains little information; if it comes as a big surprise, there is much more information. Such a measurement can capture the sense of "information" as something that removes uncertainty, but in the content, not the shape, of the message --- a novel message does not need to be long.

At the _pragmatic_ level, a message is expected to serve some goal in the system. In this sense, the "amount of information" is determined by how contributive the message is to the system. In this sense, even a single word, or a question, can "carry a lot of information" in a certain context, which cannot be explained in the previous two usages.

A very confusing usage of the phrase is to talk about the "amount of information" in an object (or event). Different from the situation of a message, which is usually described at a given level of description, an object can be described at many levels, without anyone more "fundamental" than the others. Therefore, without fully specified scope, granularity, accuracy, etc., we cannot meaningfully talk about the amount of information in the description of an object (or event), not to mention the object itself.

This topic is important to AI and CogSci, because the different types of "amount of information" are often confused with each other, and the related misconception have lead to serious problems.

"maximum entropy", "non-informative prior", "universal prior"

the limitation of Shannon's definition

the amount of information as entropy or decrease of uncertainty --- how about a message that actually increase uncertainty?
