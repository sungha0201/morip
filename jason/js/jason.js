;(function($,window,document,undefined){


    var jason = {
        init:   function(){
            var that = this;

            that.headerFn();
            that.section1Fn();
            that.section2Fn();
            that.section3Fn();
            that.section4Fn();
            that.section5Fn();

        },
        headerFn:function(){
            var that = null;
            var $window = $(window);            
            var $header = $('#header');
            var $scroll = false;
            var t = false; //toggle변수 0
            var m = 0; //메뉴 클릭 안한 상태


                $header.on({                    
                    mouseenter:function(){
                        that = $(this);
                        that.addClass('addHeader'); 
                    },
                    mouseleave:function(){
                        that = $(this);
                        if( $scroll === false && m===0 ){ //2가지 조건을 모두 만족시
                            that.removeClass('addHeader'); 
                        }
                    }
                });


                $window.scroll(function(){
                    that = $(this);
                    if( that.scrollTop() >= 30 ){
                        $scroll = true;  //스크롤 30px 이상인경우 true 변경
                        $header.addClass('addHeader');
                        if(t===false){
                            t=true;
                            var headerH = $('#header').height();
                            $('html,body').stop().animate({scrollTop:$('#section2').offset().top-headerH },600,'easeOutExpo');
                        }
                        
                    }
                    else{
                        t=false;
                        $scroll = false;  //스크롤 30px 이하인경우 false 변경
                        if(m===0){ //햄버거 메뉴 클릭 안된 상태
                            $header.removeClass('addHeader');
                        }                       
                    }
                });

                
                //햄버거 메뉴 클릭하면 기억하는 변수 설정
                //nav 네비게이션 이벤트
                $('.menu-bar').on({
                    click: function(e){
                        e.preventDefault();
                        if(m==0){
                            m = 1; //클릭한 상태
                            $('#nav').stop().animate({top:124},300);   
                        }
                        else if(m==1){
                            m = 0;
                            $('#nav').stop().animate({top:-124},300);   
                        }
                        $(this).toggleClass('addBtn');  
                                      
                    }
                });
                //메인버튼 이벤트
                $('.mainBtn').on({
                    mouseenter: function(){
                        $('.sub').stop().slideUp(100);
                        $(this).next('.sub').stop().slideDown(300);
                    }
                });
                // #nav를 벗어나면 서브메뉴 사라지는 효과 이벤트
                $('#nav').on({
                    mouseleave: function(){
                        $('.sub').stop().slideUp(300);
                    }
                });
        },
        section1Fn:function(){
            var cnt = 0; /* 증가변수는 0으로! */
            var n = $('#section1 .slide').length-2; //4 총슬라이드갯수(위아래 추가한 슬라이드 제외)
            var $slide = $('#section1 .slide');
            var $slideContainer = $('#section1 .slide-container');
            var $nextBtn = $('#section1 .next-btn');
            var $prevBtn = $('#section1 .prev-btn');
            var $slideWrap = $('#section1 .slide-wrap');
            var $pageBtn = $('#section1 .page-btn');
            var $smoothBtn = $('#section1 .smooth-btn');
            var setId = null;
            var setId2 = null;
            var s = 4; //4초 간격
            var tcnt = 0; 

            //setTimeout(autoTimerFn,10);

            function mainSlideFn(){               
                $slideWrap.stop().animate({left:-(100*cnt)+'%'},600, function(){
                    if(cnt>n-1){cnt=0;} //n개인경우 = n-1
                    if(cnt<0){cnt=n-1;} 
                    $slideWrap.stop().animate({left:-(100*cnt)+'%'},0);
                });
                //페이지버튼 함수
                pageBtnFn(cnt);
            }

            function nextCountFn(){
                cnt++;
                mainSlideFn();
                
            }

            function prevCountFn(){
                cnt--;
                mainSlideFn();
                
            }

            function autoTimerFn(){
                setId = setInterval(nextCountFn,1000*s);
            }

            function pageBtnFn(z){
                
                z==n?z=0:z;
                z==-1?z=n-1:z;
                console.log(z);
                $pageBtn.removeClass('addCurrent');
                $pageBtn.eq(z).addClass('addCurrent');
                
            }
            
            function timerFn(){
                tcnt = 0; 
                clearInterval(setId2); //중간에 버튼을 클릭했을때 다시 셋팅을위해

                setId2 = setInterval(function(){
                    tcnt++; //1초에 1씩증가
                    console.log(tcnt);
                    if(tcnt>s){ //4초후에
                        clearInterval(setId2);
                        nextCountFn();
                        autoTimerFn();                        
                    }
                },1000);
            }
            var winW = $(window).width();
            var winH = $(window).height();

            function resizeFn(){

                winW = $(window).width();
                winH = $(window).height();

                $('#section1').css({height:winH});
                $('#section2').css({marginTop:winH}); //margin top값(섹션1떄문에 밀려남)을 창높이로 설정
                $slide.css({width:winW});                
                
            }
            setTimeout(resizeFn,10);

            $(window).resize(function(){
                resizeFn();
            });



            //페이지버튼
            $pageBtn.each(function(idx){
                $(this).on({
                    click:function(e){
                        e.preventDefault();
                        clearInterval(setId);
                        timerFn();
                        cnt = idx;
                        mainSlideFn();
                    }
                });
            });

            

            $nextBtn.on({
                click:  function(e){
                    e.preventDefault();
                    clearInterval(setId);
                    timerFn();
                   if(!$slideWrap.is(':animated')){
                        nextCountFn();
                   } 
                }
            });

            $prevBtn.on({
                click:  function(e){
                    e.preventDefault();
                    clearInterval(setId);
                    timerFn();
                    if(!$slideWrap.is(':animated')){                    
                        prevCountFn();
                    }
                }
            });

            

            //터치 스와이프 이벤트
            $slideContainer.swipe({
                swipeLeft:function(e){ //다음슬라이드
                    e.preventDefault();
                    clearInterval(setId);
                    timerFn();
                   if(!$slideWrap.is(':animated')){
                        nextCountFn();
                   } 
                },
                swipeRight:function(e){ //이전슬라이드
                    e.preventDefault();
                    clearInterval(setId);
                    timerFn();
                    if(!$slideWrap.is(':animated')){                    
                        prevCountFn();
                    }
                }
            });

            ///////////////slide///////////////////////////////////////////////////////////////////////////////////////

            //smooth-btn
            $smoothBtn.on({
                click:function(e){
                    e.preventDefault();
                    var headerH = $('#header').height();
                    var url = $(this).attr('href'); 
                        $('html,body').stop().animate({ scrollTop:$(url).offset().top-headerH },600,'easeOutExpo');
                }              
            });


        },
        section2Fn:function(){
            var _win = $(window);
            var gal = $('.gallery li');
            var galleryW = gal.width();
            var galleryH = galleryW*0.832468967;

            function resizeFn(){                
                galleryW = gal.width(); //칸 너비
                galleryH = galleryW*0.832468967; //칸 높이비율계산

                gal.css({height:galleryH});
            }

            setTimeout(resizeFn(),10);

            _win.resize(function(){
                resizeFn();
            });
        },
        section3Fn:function(){
         
            var $win = $(window);
            var $winW = $win.innerWidth();
            var $slideView = $('#section3 .slide-view');
            var $pageBtnW = $('#section3 .pageBtn').innerWidth();
            var $pageWrap = $('#section3 .page-wrap');
            var $slideBg = $('#section3 .slide-bg-image');
            var $slideBgW = $('#section3 .slide-bg-image').innerWidth();
           
            
               //박스높이 slide-view 너비가 1360px이하일떄 자동 높이 570으로 설정
               function resizeFn(){
                    $winW = $win.innerWidth();
                    $pageBtnW = $('#section3 .pageBtn').innerWidth();
                    $slideBgW = $('#section3 .slide-bg-image').innerWidth();

                    if($winW<=1360){
                        $slideView.css({ height:0.419117647*$winW }); //570=1360*0.419117647
                        $pageWrap.css({height:$pageBtnW});
                        $slideBg.css({height:$slideBgW});
                    }
                    else{
                        $slideView.css({ height:570 }); 
                    }
               }
               setTimeout(resizeFn,10);

               $win.resize(function(){
                   resizeFn();
               });
               
               //페이지 인아웃 반응형 슬라이드 웹개발
               var cnt      = 0;
               var setId    = null;
               var $slide   = $('#section3 .slide');
               var n        = $slide.length-1; //3-1 = index number 0 1 2               
               var $nextBtn = $('#section3 .nextBtn');
               var $prevBtn = $('#section3 .prevBtn');
               var $pageBtn = $('#section3 .pageBtn');
               var a = [1,2];


               ////////1.메인슬라이드 페이드인아웃 함수////////////////////////////////////////
               //1-1메인 다음슬라이드 함수
               function mainNextSlideFn(){
                    $slide.css({zIndex:1}); //모든 슬라이드 다 z-index:1 = 초기화
                    $slide.eq(cnt==0?n:cnt-1).css({zIndex:2}); //현재 이전 슬라이드는 바로 뒤에 있는 상태! 현재슬라이드가 0일때에는 마지막 슬라이드가 나와야 하기 때문.
                    $slide.eq(cnt).css({zIndex:3}).animate({opacity:0},0).animate({opacity:1},1000); //현재 보이는 슬라이드
                    pageBtnFn();
               }

               //1-2메인 이전슬라이드 함수
               function mainPrevSlideFn(){
                    $slide.css({zIndex:1,opacity:1}); /* opacity 초기화 */
                    $slide.eq(cnt).css({zIndex:2}); //현재 이전 슬라이드 
                    $slide.eq(cnt==n?0:cnt+1).css({zIndex:3}).animate({opacity:0},1000); //현재슬라이드, 이미 보이고 있는 상태라서 안보이는 상태로만 바꿔주면 된다.
                    pageBtnFn();
                }

               //////2///////////////////////////////////////////
               //2-1 메인 다음 카운트슬라이드 함수
               function nextCountFn(){
                 cnt++;
                 if(cnt>n){cnt = 0;}
                 mainNextSlideFn();
               }
               //2-2 메인 이전 카운트슬라이드 함수
               function prevCountFn(){
                 cnt--;
                 if(cnt<0){cnt = n;}
                 mainPrevSlideFn();
               }



               /////3///////////////////////////////////////
               //3-1  다음 화살 버튼 클릭 이벤트 함수
               $nextBtn.on({
                   click: function(){
                    nextCountFn();
                    
                   }
               });

               //3-2  이전 화살 버튼 클릭 이벤트 함수
               $prevBtn.on({
                   click: function(){
                    prevCountFn();
                    
                   }
               });

               ////////4.페이지버튼(인디게이터) 이벤트 함수/////////////////
               //스토리 보드 :현재 슬라이드가 
               //첫번째 슬라이드 이면 페이지 버튼 1 : [1]두번째 슬라이드 이미지
               //첫번째 슬라이드 이면 페이지 버튼 2 : [2]세번쨰 슬라이드 이미지    

               //두번째 슬라이드 이면 페이지 버튼 1 : [0]첫번째 슬라이드 이미지
               //두번째 슬라이드 이면 페이지 버튼 2 : [2]세번쨰 슬라이드 이미지

               //세번째 슬라이드 이면 페이지 버튼 1 : [0]첫번째 슬라이드 이미지
               //세번째 슬라이드 이면 페이지 버튼 2 : [1]두번째 슬라이드 이미지         

               function pageBtnFn(){

                    switch(cnt){
                        case 0:
                            //case 0 1번째 슬라이드인 경우
                            a = [1,2];                         
                             break;
                        case 1:
                            //case 1 2번째 슬라이드인 경우
                            a = [0,2];
                             break;
                        case 2:
                            //case 2 3번째 슬라이드인 경우
                            a = [0,1];                            
                    }            
                    //console.log(a);          
                        for(var i=0;i<a.length;i++){
                            $pageBtn.eq(i).css({backgroundImage:'url(./img/slide0'+a[i]+'.jpg)'}); 
                        }
               }

               /* 배열을 안쓴경우
               function pageBtnFn(){

                    switch(cnt){
                        case 0:
                            //case 0 1번째 슬라이드인 경우
                             $pageBtn.eq(0).css({backgroundImage:'url(./img/slide01.jpg)'}); //제이쿼리에서는 .하나만 쓰기!
                             $pageBtn.eq(1).css({backgroundImage:'url(./img/slide02.jpg)'});
                             break;
                        case 1:
                            //case 1 2번째 슬라이드인 경우
                             $pageBtn.eq(0).css({backgroundImage:'url(./img/slide00.jpg)'}); //제이쿼리에서는 .하나만 쓰기!
                             $pageBtn.eq(1).css({backgroundImage:'url(./img/slide02.jpg)'});
                             break;
                        case 2:
                            //case 2 3번째 슬라이드인 경우
                             $pageBtn.eq(0).css({backgroundImage:'url(./img/slide00.jpg)'}); //제이쿼리에서는 .하나만 쓰기!
                             $pageBtn.eq(1).css({backgroundImage:'url(./img/slide01.jpg)'});
                    }
                                      
               } */

               ////////5.페이지버튼(인디게이터 버튼) 클릭 이벤트///////////////
               $pageBtn.each(function(idx){
                    $(this).on({
                        click: function(){

                            //바뀌기 이전 상태
                            //console.log('현재슬라이드',cnt); 현재 실행중인 슬라이드번호
                            //console.log('클릭한슬라이드',a[idx]); 클릭한 슬라이드 번호

                            var imsi = cnt; //현재 실행 중인 번호를 임시에 보관 그리고 비교
                                cnt = a[idx]; //a[1,2] 클릭한 인수에 해당된 배열값 a[1]=2 a[2]=3

                            if(imsi<a[idx]){ //클릭한 번호가 더 크면 다음 슬라이드
                                mainNextSlideFn(); //함수 실행 범위(scope)에 변수 cnt가 할당
                            }
                            else if(imsi>a[idx]){ //클릭한 번호가 더 작으면 이전 슬라이드
                                mainPrevSlideFn();
                            }
                            //결과 후 변수 값들
                            //console.log('현재슬라이드',cnt); 현재 실행중인 슬라이드번호
                            //console.log('클릭한슬라이드',a); 슬라이드 페이지 버튼의 배열 모두 출력

                        }
                    });
               });
              


        },
        section4Fn:function(){
            //슬라이드 container박스 너비에 따른 슬라이드 3개의 너비 구하기
            //1570-40(마진값20*2)=1530
            //슬라이드1개너비 = 1570/3 = 523.3333 = view박스의 너비
            //반응형으로 슬라이드 컨테이너('.slide-container') 박스 너비 변화에 따른 슬라이드 너비 계산
            var slideNum     = 3; //980초과:3, 980이하 :2, 600이하 1, 한화면에 보여지는 슬라이드 갯수
            var slideW     = $('#section4 .slide-container').width()/slideNum;
            var $slide     = $('#section4 .slide');
            var $pageBtn     = $('#section4 .pageBtn');
            var tonN       = $slide.length; //10
            var $slideWrap = $('#section4 .slide-wrap');
            var $slideCon  = $('#section4 .slide-container');
            var cnt        = 0;
            var setId      = null;
            var setId2     = null; //지역변수로 써도 무방함.


            function resizeFn(){
                if($slideCon.innerWidth()>1024){  //수치,범위엔 if문을 많이씀
                    slideNum=3;
                }
                else if($slideCon.innerWidth()>680){
                    slideNum=2;
                }
                else{
                    slideNum=1;
                }
                slideW = $slideCon.innerWidth()/slideNum; //슬라이드 1개의 너비
                $slideWrap.css({width:(slideW*tonN),marginLeft:-(slideW*3) }); //3 4 3
                $slide.css({width:slideW,height:slideW-40});
                $slideWrap.stop().animate({left:-(slideW*cnt) },0); //동적으로 하고싶으면 속도를 입력하면 됨./mainSlideFn();을 써도됨
            }   

            setTimeout(resizeFn,10);  //처음 로딩시 once 1번만 실행 또는 새로고침

            $(window).resize(function(){ //크기가 변경 될때만 반응
                resizeFn();
            });

            //1.메인슬라이드 함수
            function mainSlideFn(){
                $slideWrap.stop().animate({left:-(slideW*cnt) },600,'easeOutExpo',function(){
                    if(cnt>3){cnt=0;} //0~3(4개의 슬라이드)
                    if(cnt<0){cnt=3;}
                    $slideWrap.stop().animate({left:-(slideW*cnt) },0); //초기화
                });
                pageBtnEventFn();
            }

            //2-1.다음 카운트 슬라이드 함수
            function nextCountFn(){
                cnt++;
                mainSlideFn();
            }
            //2-2.이전 카운트 슬라이드 함수
            function prevCountFn(){
                cnt--;
                mainSlideFn();
            }
            //3.스와이프 다음/이전 터치 이벤트
            $slideCon.swipe({
                swipeLeft: function(){
                    timerControlFn();
                    if( !$slideWrap.is(':animated') ){
                        nextCountFn(); 
                    }
                },
                swipeRight: function(){
                    timerControlFn();
                    if( !$slideWrap.is(':animated') ){
                        prevCountFn(); 
                    }
                }
            });
            //4. 페이지 버튼 이벤트 함수
            function pageBtnEventFn(){
                var z = cnt; //메인슬라이드 함수cnt가 바뀌기 때문에 z로 지역변수설정
                if(z>3){z=0}
                if(z<0){z=3}
                $pageBtn.removeClass('addPage');
                $pageBtn.eq(z).addClass('addPage');
            }

            //5.페이지 버튼 클릭이벤트   
            //직접 메인함수 연동
            $pageBtn.each(function(idx){
                $(this)
                    .on('click',function(e){
                        e.preventDefault();
                        timerControlFn();
                        cnt = idx; //직접 선택한 슬라이드 번호를 이용 메인슬라이드 함수 호출
                        mainSlideFn();
                    });
            });     
                            
            //6.자동 실행 함수
            function autoPlayFn(){
                setId = setInterval(nextCountFn,6000);
            }
            autoPlayFn();

            //7. 타이머 컨트롤 함수
            function timerControlFn(){
                var tcnt = 0; //cnt가 중복되므로 타이머 전용 변수로 tcnt로 설정
                clearInterval(setId); //초기화를 하지 않으면 계속 카운트가 된다.
                clearInterval(setId2);
                setId2 = setInterval(function(){
                    tcnt++;
                    if(tcnt>=6){
                        clearInterval(setId2);
                        nextCountFn(); //6초후 바로 실행
                        autoPlayFn(); //자동으로 6초 후에 실행
                    }
                },1000);
            }
        },
        section5Fn:function(){
            
        }
    };

    jason.init();


})(jQuery,window,document);