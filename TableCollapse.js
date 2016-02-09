/*Jquery Table Collapse Plugin*/
/*Requrement : Jquery, Bootstrap.css and Bootstrap.js*/
/*Usage $('table').tableCollpase([1, 2,...]);*/

!function ($) {

    "use strict";

    /*Contruction Function which take the table object 
    and and array of intigers as input parameters*/
    var TableCollpase = function (el, colArr) {
        this.visible_xs_ColArr = colArr;
        this.popOver;
        this.$table = $(el);
        this.createPopOver();
        this.hideColumns();
        this.initClickEvent();
    };

    /*Add hidden-xs class whose index are not in visible_xs_ColArr*/
    TableCollpase.prototype.hideColumns = function () {
        var numberOfColumns = $('#' + this.$table.attr('id') + ' tbody tr:nth-child(1) td').length;
        for (var i = 1; i <= numberOfColumns; i++) {
            if (this.visible_xs_ColArr.indexOf(i) == -1) {
                $('#' + this.$table.attr('id') + ' td:nth-child(' + i + ')').addClass('hidden-xs');
                $('#' + this.$table.attr('id') + ' th:nth-child(' + i + ')').addClass('hidden-xs');
            }
        }
    }

    /*defining click event on column selector*/
    TableCollpase.prototype.initClickEvent = function () {
        var numberOfColumns = $('#' + this.$table.attr('id') + ' tbody tr:nth-child(1) td').length;
        var popOverEle = this.popOver;
        $('#' + this.$table.attr('id') + '-ColumnSelector').click(function (e) {
            debugger;
            var formEle = $('<form id="columnSelector"></form>');
            for (var i = 1; i <= $('#' + e.target.id.split('-')[0] + ' thead tr:nth-child(1) th').length ; i++) {
                var columnHeading = $('#' + e.target.id.split('-')[0] + ' thead tr:nth-child(1) th:nth-child(' + i + ')').html();
                if ($('#' + e.target.id.split('-')[0] + ' td:nth-child(' + i + ')').hasClass("hidden-xs")) {
                    var str = '<input class="collapse-chk" type="checkbox" id="chk' + i + '" data-parent="' + this.id + '" />';

                }
                else
                    var str = '<input class="collapse-chk" type="checkbox" id="chk' + i + '"  checked data-parent="' + this.id + '" />';

                formEle.append($(str)).append(columnHeading).append('<br/>');
            }
            popOverEle.attr('data-content', formEle.html());
            var popover = $('#' + e.target.id).data('bs.popover');
            popover.setContent();
            popover.$tip.addClass(popover.options.placement);
            $('.popover-content').off("click", "input", chkhandler);
            $('.popover-content').on('click', 'input', chkhandler);
        });
    }

    //Column selected check box event listener.
    function chkhandler(event) {
        var id = this.id;
        debugger;
        if (this.checked) {
            $('#' + $(this).attr('data-parent').split('-')[0] + ' td:nth-child(' + id.replace('chk', '') + ')').removeClass('hidden-xs');
            $('#' + $(this).attr('data-parent').split('-')[0] + ' th:nth-child(' + id.replace('chk', '') + ')').removeClass('hidden-xs');
        }
        else {
            $('#' + $(this).attr('data-parent').split('-')[0] + ' td:nth-child(' + id.replace('chk', '') + ')').addClass('hidden-xs');
            $('#' + $(this).attr('data-parent').split('-')[0] + ' th:nth-child(' + id.replace('chk', '') + ')').addClass('hidden-xs');
        }
    }

    /*Creating popover with selectible list of column*/
    TableCollpase.prototype.createPopOver = function () {
        var tableContent = this.$table.parent().html();
        var parent = this.$table.parent();
        if (parent.find(".fa-ellipsis-h").length == 0) {
            this.$table.parent().empty();
            parent.append('<span id="' + this.$table.attr('id') + '-ColumnSelector" class="glyphicon glyphicon-option-horizontal visible-xs" style="width:25px;font-size:20px" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="------------------------ "></span>');
            parent.append(tableContent);
            debugger;
            this.popOver = $('#' + this.$table.attr('id') + '-ColumnSelector').popover({
                placement: 'bottom',
                html: 'true'
            });
        }
    }

    /*Plugin defenition*/
    $.fn.tableCollpase = function (option) {
        new TableCollpase(this, option);
    };


    /*Contructor mapping*/
    $.fn.tableCollpase.Constructor = TableCollpase;


}(window.jQuery);

