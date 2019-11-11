export default () => {
    let fading = false;
    let interval;
    let timeLeft = 0;

    /**
     * Reduce time and send message to main script
     * @private
     */
    const _reduceTime = () => {
        if (timeLeft - 1 >= 0) {
            timeLeft -= 1;

            self.postMessage({
                timeLeft: timeLeft,
                isTimeOver: false,
            });
        } else {
            clearInterval(interval);
            fading = false;

            self.postMessage({
                isTimeOver: true,
            });
        }
    };


    self.addEventListener('message', function(e){
        switch (e.data.type) {
            case 'start':
                if (!fading){
                    fading = true;

                    timeLeft = e.data.timeLeft;

                    interval = setInterval(_reduceTime, 1000);
                }
                break;
            case 'stop':
                clearInterval(interval);
                fading = false;
                break;
            case 'update':
                if (fading){
                    clearInterval(interval);

                    timeLeft = e.data.timeLeft;

                    interval = setInterval(_reduceTime, 1000);
                }
                break;
        }
    }, false);

};
