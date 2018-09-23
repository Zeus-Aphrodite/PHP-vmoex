function render(template, parameters) {
    for (var key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            var reg = new RegExp('@'+key+'@', 'g');
            template = template.replace(reg, parameters[key]);
        }
    }

    return $(template);
}

function error(msg) {
    bootoast({
        message:msg,
        type: 'danger',
        position: 'top-center',
        icon: undefined,
        timeout: 3,
        animationDuration: 300,
        dismissable: true
    });
}

function warning(msg) {
    bootoast({
        message:msg,
        type: 'warning',
        position: 'top-center',
        icon: undefined,
        timeout: 3,
        animationDuration: 300,
        dismissable: true
    });
}

function success(msg) {
    bootoast({
        message:msg,
        type: 'success',
        position: 'top-center',
        icon: undefined,
        timeout: 3,
        animationDuration: 300,
        dismissable: true
    });
}

function info(msg) {
    bootoast({
        message: msg,
        type: 'info',
        position: 'bottom-left',
        icon: 'info-sign',
        timeout: 5,
        animationDuration: 300,
        dismissable: true
    });
}

function reload() {
    $.pjax.reload('.content-body', {
        fragment: '.content-body',
        timeout: 200000000,
        show: 'fade',
        cache: true,
        push: true
    })
}

function go(url) {
    $.pjax({
        url: url,
        container: '.content-body',
        fragment: '.content-body',
        timeout: 200000000,
        show: 'fade',
        cache: true,
        push: true,
        replace: false
    });
}

function handleNewMessage(data) {
    info(data.msg);

    var message  = data.data;
    var $messageCount = $('#MyMessageCount');
    var $messageLabel = $('.nav-message-label');

    if ($messageCount.length) {
        var originCount = parseInt($messageCount.text());
        if (originCount > 10) {
            return ;
        }
        $messageCount.text(originCount + 1);
    } else {
        var messageLabel = $messageLabel.text();
        var newMessageLabel = messageLabel + '(<b id="MyMessageCount"></b>)';
        $messageLabel.html(newMessageLabel);
        $('b#MyMessageCount').text(1);
    }

    var html = render($('#message-item-tpl').html(), {
        content: message.content,
        username: message.sender_username,
        createdAt: message.createdAt,
        nickname: message.sender
    });

    $('li.messages ul').prepend(html);
    $messageLabel.addClass('warning-color');
}

function handleNewFollower(data) {
    info(data.msg);
    var $label = $('.notification-label');
    var text = $label.attr('data-origin');
    $label.html(text + '(<b style="color: red">new</b>)');
}

function handleNewChat() {
    $('.nav-chat-dot').addClass('push-notifications-count');
}

function handleCreateBlogEvent(data) {
    $('#processBlogStep4 .progress').append('<span class="help-block">'+data.msg+'</span>');
}

function path(route, parameters) {
    for (var k in parameters) {
        if (parameters.hasOwnProperty(k)) {
            route = route.replace(k, parameters[k]);
        }
    }
    return route;
}

function setEndOfContenteditable(contentEditableElement) {
    var range,selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if(document.selection)//IE 8 and lower
    {
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
}