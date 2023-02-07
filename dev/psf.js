const LOGO_CELL_NAME = 'LogoCell';
const KPI_VIEW_AREA_ITEM_NAME = 'KPIs';
const REQUEST_LIST_AREA_ITEM_NAME = 'Requests';
const HEADER_AREA_ITEM_NAME = 'Header';
const SEARCH_BAR_CONTROL_NAME = "Auto-Complete";

$(document).ready(function() {
    enableTheme();
    render();
});


isModile = () => $('body').hasClass("mobile");

enableTheme = () => {
    $('body').addClass('psf');
    $('form').addClass('psf');
    $('.runtime-content').addClass('psf');
    $('.runtime-form').addClass('psf');
}

render = () => {
    renderHeader();
    renderNavigation();
    renderKPIs();
    renderSearchBox();
}

renderNavigation = () => isMobile() ? renderDrawer() : renderSidebar();

renderSidebar = () => {
    const sidebar = $("<div id='sidebar' class='sidebar'></div>");
    let logoSpan = $('span[name="' + LOGO_CELL_NAME + '"]');
    logoSpan.addClass('logo');
    $('<div id="logo" class="logo">' + logoSpan.html() + '</div>').prependTo($('#sidebar'));
    $('div.logo').height($('div.header').height())
    if ($('ul.tab-box-tabs').length > 0) {
        $('#sidebar').append('<div id="tabs" class="sidebar-tabs">')
        $('.sidebar-tabs').append($('ul.tab-box-tabs'));
        $('a.tab').append('<div class="sidebar-border"><span class="top"></span><span class="bottom"></span></div>');
    }
    $('.runtime-content').parent().append(sidebar);
    $('.runtime-content').addClass('with-sidebar');
}

renderKPIs = () => {
    $('div[name="' + KPI_VIEW_AREA_ITEM_NAME + '"]').closest('.view').addClass('kpi')
    renderKPICard("active", 1);
    renderKPICard("overdue", 3);
    renderKPICard("urgent", 5);
    renderActionCard("new", 1);
    renderActionCard("reports", 2);
    renderActionCard("admin", 3);
    renderListView();
}

renderKPICard = (name, cardIndex) => {
    $('<div id="' + name + '" class="card ' + name + '">').prependTo('div[name="tblKPIs"]')
    cardDiv = $('#' + name)
    labelSpan = $('.psf div.kpi .panel-body-wrapper div[name="tblResponsiveIcons"]> span[col="1"] > div > span[col="' + cardIndex + '"][row="1"]');
    labelSpan.addClass('kpi-label');
    imageSpan = $('.psf div.kpi .panel-body-wrapper div[name="tblResponsiveIcons"]> span[col="1"] > div > span[col="' + cardIndex + '"][row="2"]');
    imageSpan.addClass('kpi-icon');
    numberSpan = $('.psf div.kpi .panel-body-wrapper div[name="tblResponsiveIcons"]> span[col="1"] > div > span[col="' + (cardIndex + 1) + '"][row="2"]');
    numberSpan.addClass('kpi-number');
    textSpan = $('.psf div.kpi .panel-body-wrapper div[name="tblResponsiveIcons"]> span[col="1"] > div > span[col="' + cardIndex + '"][row="3"]');
    textSpan.addClass('kpi-text');

    [labelSpan, imageSpan, numberSpan, textSpan].forEach((e) => cardDiv.append(e));
}

renderActionCard = (name, cardIndex) => {
    $('<div id="' + name + '" class="actions card ' + name + '">').appendTo('div[name="tblKPIs"]')
    cardDiv = $('#' + name)
    labelSpan = $('.psf div.kpi .panel-body-wrapper div[name="tblResponsiveIcons"]> span[col="3"] > div > span[col="' + cardIndex + '"][row="1"]');
    labelSpan.addClass('kpi-label');
    imageSpan = $('.psf div.kpi .panel-body-wrapper div[name="tblResponsiveIcons"]> span[col="3"] > div > span[col="' + cardIndex + '"][row="2"]');
    imageSpan.addClass('kpi-icon');
    textSpan = $('.psf div.kpi .panel-body-wrapper div[name="tblResponsiveIcons"]> span[col="3"] > div > span[col="' + cardIndex + '"][row="3"]');
    textSpan.addClass('kpi-text');

    [labelSpan, imageSpan, textSpan].forEach((e) => cardDiv.append(e));
    $('div.card.' + name).click(function() { $('div.card.' + name + '>span[col="1"][row="2"]>img').click() });
}

renderListView = () => {
    $('div[name="' + REQUEST_LIST_AREA_ITEM_NAME + '"]').closest('.view').addClass('requests');
}

renderHeader = () => {
    $('div[name="' + HEADER_AREA_ITEM_NAME + '"]').closest('.view').addClass('header');
}

renderSearchBox = () => {
    $('div[name="' + SEARCH_BAR_CONTROL_NAME + '"]').addClass('search-control');
}

renderDrawer = () => {
    var headerView = $('header')
    headerView.insertBefore(".runtime-content");
    headerView.after("<div class='header-placeholder'></div>");
    var headerPlaceholder = $('.header-placeholder');

    // sticky header

    var headerOffset = 0;
    $(window).scroll(function() {
        if (headerOffset === 0) {
            headerOffset = headerView.height();
            headerPlaceholder.height(headerOffset);
        }
        if (window.pageYOffset >= headerOffset) {
            headerView.addClass('fixed');
            headerPlaceholder.css({ display: 'block' });
        } else {
            headerView.removeClass('fixed');
            headerPlaceholder.css({ display: 'none' });
        }
    });
}

/*

$('input[name="Search Box"]').keypress(function (e) {
        var key = e.which;
        if (key == 13) {
            var value = e.currentTarget.value;
            $(e.currentTarget).SFCTextBox('option', 'text', value);
            $('a[name ="Search Button"]').click();
            return false;
        }
    })
*/