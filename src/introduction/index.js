import './index.scss'

(function typing(typingEls) {

    const typingDurationPerText = 0.05;    //打字的频率
    const caretBlinkDuration = 0.5;    //光标闪烁的频率

    let _typingDelay = 0;   //记录当前行打字动画开始需要的延时
    let _lastTypingDuration = 0;   //记录上一行文字的打字动画执行时间

    typingEls.map(el => {
        let textNum = el.textContent.length;    //当前行的文字数量
        let typingDuration = typingDurationPerText * textNum;    //当前行打字动画的执行时间

        _typingDelay += _lastTypingDuration;
        _lastTypingDuration = typingDuration;

        el.style.width = `${textNum}ch`;
        el.style.animationDelay = `${_typingDelay}s`;
        el.style.animationDuration = `${typingDuration}s, ${caretBlinkDuration}s`;
        el.style.animationTimingFunction = `steps(${textNum}), steps(1)`;     //打字效果和闪烁效果

        //非最后一个，动画结束后取消光标
        ['animationend', 'webkitAnimationEnd', 'oAnimationEnd', 'msAnimationEnd'].map(event => {
            el.addEventListener(event, () => {
                if (typingEls.indexOf(el) !== typingEls.length - 1) {
                    el.style.border = 'none';
                }
            })
        });
    });
})(Array.prototype.slice.call(document.querySelectorAll('.typing')));
