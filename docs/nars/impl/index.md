
# NARS 各个版本实现介绍


在NARS的发展过程中，涌现了一大批研究者按照NARS的运作逻辑，用各种编程语言自己编写NARS核心。


由于版本多，加之理论难度和编程难度都对初学者入门造成了一定的阻碍，因此特地总结各个版本实现的简介和运行教程，让新手也能在自己计算设备上运行NARS，感受其实际效果。


## 各版本总览


最经典的是王培教授使用Java语言编写实现的[OpenNars 1.5.8](opennars1.5.8)。这一版实现了NAL1-6层，实现效果：稳定无变动。

[ARCJ137442](https://github.com/ARCJ137442)
根据此版本魔改了一版实现，名为[OpenNARS-158-dev](https://github.com/ARCJ137442/OpenNARS-158-dev)
，并且在内补充了详尽的中文注释，可便于学习。

ARCJ137442 还根据此魔改版本实现了[Narust](narust)。

opennars经过发展后有3.0.4、3.1.1等几个大版本，

最后更换了python语言，由徐博文博士主持编写[pynars (opennars 4.0)](pynars)。

4.0版本大改了控制机制，增加了多通道输入和对时间事件的感知与预测。整体实现由python实现，性能部分对接C++编写的cNARS作为运算单元，加快python代码运行速度。

- TODO：还有更多版本 见[tagit](https://cis.temple.edu/tagit/#projects)。