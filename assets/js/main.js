// Scroll nav effect
    window.addEventListener('scroll', function() {
      document.querySelector('.bam-nav').classList.toggle('scrolled', window.scrollY > 30);
    });
    // FAQ accordion
    document.querySelectorAll('.bam-faq-q').forEach(function(q) {
      q.addEventListener('click', function() {
        var item = this.closest('.bam-faq-item');
        var isOpen = item.classList.contains('open');
        document.querySelectorAll('.bam-faq-item').forEach(function(i){ i.classList.remove('open'); });
        if (!isOpen) item.classList.add('open');
      });
    });
    // Scroll reveal
    var reveals = document.querySelectorAll('.reveal');
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e, i){
        if(e.isIntersecting){ setTimeout(function(){ e.target.classList.add('up'); }, i * 80); io.unobserve(e.target); }
      });
    }, {threshold: 0.07});
    reveals.forEach(function(el){ io.observe(el); });
    // Counter animation
    function animCount(el){
      var target = parseFloat(el.dataset.count);
      var suffix = el.dataset.suffix || '';
      var dur = 1800, start = performance.now();
      (function tick(t){
        var p = Math.min((t-start)/dur,1), e = 1-Math.pow(1-p,3);
        el.textContent = (target%1===0?Math.floor(e*target):( e*target).toFixed(1)) + suffix;
        if(p<1) requestAnimationFrame(tick);
      })(start);
    }
    var cio = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ animCount(e.target); cio.unobserve(e.target); } });
    },{threshold:0.5});
    document.querySelectorAll('[data-count]').forEach(function(el){ cio.observe(el); });