//For testing more efficiently, the pause interval time has been shortened

var steps = 0; // The times that user clicks the button
var isProposer = false;
needProposer = true;

function sleep(ms) //Sleep for seconds to simulate the 'matching' status
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

function randomNum(minNum,maxNum) //Generate a random integer between minNum and maxNum
{ 
    switch(arguments.length)
    { 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 

window.onload = function() 
{
    var instruction = document.getElementById("instruction");
    //var inputInfo = document.getElementById('inputInfo');
    var continueButton = document.getElementById('continue');
    var testID = document.getElementById("testID");
    var phone = document.getElementById("phone");
    var np = document.getElementById("errorTips");
    var contact = document.getElementById("contact");
    contact.value = 0;

    continueButton.style.display = "none";
    testID.onkeyup = function()
    {
        if(steps == 0)
        {
            if(testID.value == null || testID.value == ""|| testID.value.indexOf(" ") != -1 ||
                phone.value == null || phone.value == "" || phone.value.indexOf(" ") != -1 ||
                isNaN(parseFloat(testID.value)) == true || isNaN(parseFloat(phone.value)) == true) 
            {
                np.innerHTML = "请输入完整合法信息！（不含空格）";
                continueButton.style.display = "none";
            }
            else if(!(parseFloat(testID.value) >= 0))
            {
            np.innerHTML = "请输入合法数值！";
            continueButton.style.display = "none";
            }
            else
            {
                np.innerHTML = "";
                continueButton.style.display = "";
            }
        }
    }

    phone.onkeyup = function()
    {
        if(steps == 0)
        {
            if(testID.value == null || testID.value == ""|| testID.value.indexOf(" ") != -1 ||
                phone.value == null || phone.value == "" || phone.value.indexOf(" ") != -1 ||
                isNaN(parseFloat(testID.value)) == true || isNaN(parseFloat(phone.value)) == true) 
            {
                np.innerHTML = "请输入完整合法信息！（不含空格）";
                continueButton.style.display = "none";
            }
            else if(!(parseFloat(phone.value) >= 0))
            {
                np.innerHTML = "请输入合法数值！";
                continueButton.style.display = "none";
            }
            else
            {
                np.innerHTML = "";
                continueButton.style.display = "";
            }
        }
    }

    continueButton.onclick = async function()
    {
        steps++;
        console.log(steps);
        loadPage();
    }

    async function matching(sentence, minWait, maxWait, tip) //Simulate matching
    {
        continueButton.style.display = "none";
        np.innerHTML = sentence;
        await sleep(1000 * randomNum(minWait,maxWait));
        np.innerHTML = tip;
        await sleep(500);
        np.innerHTML = "";
        testID.setAttribute("readonly", "readonly");
    }

    function inputValid(total) // Judge whether the user's input is valid
    {
        phone.value = total - testID.value;
        if(testID.value == null || testID.value == ""|| testID.value.indexOf(" ") != -1 ||
           phone.value == null || phone.value == "" || phone.value.indexOf(" ") != -1 ||
           isNaN(parseFloat(testID.value)) == true || isNaN(parseFloat(phone.value)) == true) 
        {
            np.innerHTML = "请输入合法数值！";
            continueButton.style.display = "none";
        }
        else if(!(parseFloat(testID.value) >= 0 && parseFloat(testID.value) <= total))
        {
            np.innerHTML = "请输入合法数值！";
            continueButton.style.display = "none";
        }
        else
        {
            np.innerHTML = "";
            continueButton.style.display = "";
        }
    }

    function initialInput() // Initialize 2 input box
    {
        testID.style.display = "";
        //phone.style.display = "";
        testID.value = "";
        testID.setAttribute("placeholder", "你获得（元）");
        testID.removeAttribute("readonly");
        //phone.value = "";
        //phone.setAttribute("placeholder", "你的搭档获得");
        //phone.setAttribute("readonly", "readonly");
    }

    

    async function loadPage() // Update the page
    {
        switch (steps)
        {
            case 0:
            
            case 1:
                if(testID.value == null || testID.value == ""|| testID.value.indexOf(" ") != -1 ||
                   phone.value == null || phone.value == "" || phone.value.indexOf(" ") != -1)
                {
                    console.log(testID.value);
                    console.log("Info empty");
                    np.innerHTML = "请输入完整信息！(不含空格)";
                    steps--;
                    return;
                }
                
                np.innerHTML = "";
                //testID.value = "";
                //phone.value = "";
                testID.style.display = "none";
                phone.style.display = "none";
                continueButton.style.display = "none";

                instruction.innerHTML = '<p class="title">欢迎参与实验！请认真阅读指导语：</p>\
                <p>该部分为<span class="strong">联网博弈游戏</span>，\
                我们<span class="strong">随机从预约在同一时间段的且已答完第部分问卷的参与者中随机收取一名参与者  \
                作为你的搭档，来完成分配金额的任务。</span></p> \
		<p><b>本次任务共有2个角色“提议者”和“接受者”，\
                其中提议者将起主导作用，决定每次金额的分配情况，\
                而无论提议者给出什么样的分配，接受者只能被动接受。</b>\
                本次任务将根据你和你的搭档填写的预约问卷中相关题目得分来分配相应的角色。</p>\
                <p><b>任务将包括4次分配金额的任务，每次任务之间不存在任何关系。</b>\
                我们将随机抽取一次任务的分配比例作为你和你搭档最终的额外被试费的分配比例，\
                <b>即提议者不仅决定本次任务中所有的金额分配，还将决定本次实验额外被试费的分配情况。</b></p> \
                <p>如若你已阅读完毕并理解实验流程，请按继续键(60秒后方出现)。         \
                如果有任何问题，请马上联系主试再进行实验，谢谢！</p>';

                await sleep(1000);

                continueButton.style.display = "";
                break;
            case 2:
                continueButton.style.display = "none";
                if(needProposer)
                {
                    instruction.innerHTML = '<p class="title"><span class="strong">通过计算你之前填写的预约问卷相关题目的得分，</span></p>\
                    <p class="title"><span class="strong">很遗憾你是接受者！</span></p>\
                    <p>你的实验任务为<span class="strong">被动接受金额分配</span>\
                    你的搭档会根据总金额分配他和你各获得多少钱，然后我们会将他分配好的结果呈现在你的屏幕上，\
                    <span class="strong">你只能接受他的分配</span>\
                    。但是，我们仍然需要了解你对金额分配的想法，所以你需填写在该总金额下你最低能够接受的金额。</p>\
                    <p>请注意，我们将随机抽取一次作为你和你的搭档额外被试费分配。\
                    <span class="strong">这意味着你的搭档一定程度上决定你的实验报酬！ </span></p>\
                    <p>如若你已阅读完毕并理解实验流程，请按继续键(20秒后出现)。\
                    <p>如果有任何问题，请马上联系主试再进行实验，谢谢！';
                    
                    isProposer = true;
                    contact.value = "4";

                    await sleep(1000);
                    continueButton.style.display = "";
                    
                
                }
                else
                break;
            case 3:
                
                if(isProposer)
                {
                   
//                    instruction.innerHTML = '你的搭档正在进行分配金额的任务，稍后会将他的分配结果<br>
//                    呈现在你的屏幕，当完成接受任务后，将开始新的一次任务，请稍等';
                    
//                    setTimeOut(()=>{}, 4000);
//                    contact.value="1"
//                    initialInput();
//                    testID.onkeyup = function()
//                     {
//                         inputValid(100);
//                     }
                    contact.value = "4";
		            continueButton.style.display = "";
                }
                
                else
                {}
                break;
            case 4:
                if(isProposer)
                {
                    await matching("同一时段正在等待匹配搭档的参与者有6人，请耐心等候...", 6, 8, "匹配成功");
		            await matching("你的搭档正在进行分配金额的任务，稍后会将他的分配结果</span></p>呈现在你的屏幕，当完成接受任务后，将开始新的一次任务，请稍等", 3, 5, "分配完成")
                    instruction.innerHTML = '本次分配金额<span class="strong">100\
                                             元</span></p>\
                                             <span class="strong">你搭档决定的分配是：</span></p>\
                                             你获得：<span class="strong">10\
                                             元</span></p>\
                                             你的搭档获得：<span class="strong">90\
                                             元</span></p>\
                                             在该金额中，你能接受分配到的最低金额<br>\
                                             最低金额：';
                    contact.value="1";
                    initialInput();
                    testID.onkeyup = function()
                    {
                        inputValid(100);
                    }

                }
                else
                {}
                break;
            
            case 5:
                if(isProposer)
                {
                    continueButton.style.display = "none";
                    await matching("你的搭档正在进行分配金额的任务，稍后会将他的分配结果</span></p>呈现在你的屏幕，当完成接受任务后，将开始新的一次任务，请稍等", 4, 10, "分配完成");
                    instruction.innerHTML = '本次分配金额<span class="strong">120\
                                             元</span></p>\
                                             <span class="strong">你搭档决定的分配是：</span></p>\
                                             你获得：<span class="strong">35\
                                             元</span></p>\
                                             你的搭档获得：<span class="strong">85\
                                             元</span></p>\
                                             在该金额中，你能接受分配到的最低金额</span></p>\
                                             最低金额：';
                    continueButton.style.display = "";
                    contact.value="2";
                    initialInput();
                    testID.onkeyup = function()
                    {
                        inputValid(120);
                    }
                }
                else
                {}
                break;

            case 6:
                if(isProposer)
                {
                    continueButton.style.display = "none";
                    await matching("你的搭档正在进行分配金额的任务，稍后会将他的分配结果</span></p>呈现在你的屏幕，当完成接受任务后，将开始新的一次任务，请稍等", 4, 10, "分配完成");
                    instruction.innerHTML = '本次分配金额<span class="strong">100\
                                             元</span></p>\
                                             <span class="strong">你搭档决定的分配是：</span></p>\
                                             你获得：<span class="strong">20\
                                             元</span></p>\
                                             你的搭档获得：<span class="strong">80\
                                             元</span></p>\
                                             在该金额中，你能接受分配到的最低金额</span></p>\
                                             最低金额：';
                    continueButton.style.display = "";
                    contact.value="1";
                    initialInput();
                    testID.onkeyup = function()
                    {
                        inputValid(100);
                    }
                }
                else
                {}
                break;

            case 7:
                if(isProposer)
                {
                    continueButton.style.display = "none";
                    await matching("你的搭档正在进行分配金额的任务，稍后会将他的分配结果\
                                             呈现在你的屏幕。本次任务为最后一次分为任务，所以当你完成接受任务后，\
                                             将自动跳转至结束页面，请稍等", 4, 10, "分配完成")
                    instruction.innerHTML = '本次分配金额<span class="strong">120\
                                             元</span></p>\
                                             <span class="strong">你搭档决定的分配是：</span></p>\
                                             你获得：<span class="strong">20\
                                             元</span></p>\
                                             你的搭档获得：<span class="strong">100\
                                             元</span></p>\
                                             在该金额中，你能接受分配到的最低金额</span></p>\
                                             最低金额：';
                    continueButton.style.display = "";
                    contact.value="3";
                    initialInput();
                    testID.onkeyup = function()
                    {
                        inputValid(120);
                    }
                    
                }
                else
                {}
                break;
            case 8:
                await sleep(1500);
                //await matching("请稍候，等待搭档接受中...", 3, 6, "接受成功，请继续测试");
                np.innerHTML = "";
                testID.value = "";
                phone.value = "";
                contact.value = "4";
                testID.style.display = "none";
                phone.style.display = "none";
                continueButton.style.display = "none";
                instruction.innerHTML = "感谢你的参与，请继续填写问卷";
                continueButton.value = "完成";
                break;
                
        }
    }
}
