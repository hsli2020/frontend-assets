String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
};

String.prototype.repeat = function(n) {
    return Array(n+1).join(this);
}

/* GLOBAL Functions */

function showToast(msg, autoHide=false) {
    $.toast({
        heading: 'Success',
        text: msg,
        showHideTransition: 'fade',
        hideAfter: autoHide,
        position: { right: 30, top: 60 },
        icon: 'success'
    })
}

function showError(msg) {
    $.toast({
        heading: 'Error',
        text: msg,
        showHideTransition: 'fade',
        hideAfter: 5000,
        position: { right: 30, top: 60 },
        icon: 'error'
    })
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(name, value, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

/* click-to-copy in all table cells */
jQuery.fn.selectText = function() {
    var obj = this[0];
    if (document.body.createTextRange) {
        var range = obj.offsetParent.createTextRange();
        range.moveToElementText(obj);
        range.select();
    } else if (window.getSelection) {
        var selection = obj.ownerDocument.defaultView.getSelection();
        var range = obj.ownerDocument.createRange();
        range.selectNodeContents(obj);
        selection.removeAllRanges();
        selection.addRange(range);
    }
    return this;
}

function highlightRow($el) {
    var tr = $el.closest('tr');
    $('tr').removeClass('info');
    tr.addClass('info');
}

function enableClickToCopy() {
    $('table td:not(.no-click-to-copy)').click(function() {
        var text = $(this).text().trim();
        //console.log(text);

        var textarea = $('#click2copy');
        textarea.show();
        textarea.val(text);
        textarea.select();
        document.execCommand('copy');
        textarea.hide();

        $(this).selectText();
    });
}

/* click on order id */
function enableOrderClick(highlight = true) {
    $('.order-id a').click(function() {
        if (highlight) $('tr').removeClass('info');

        var tr = $(this).closest('tr');
        var orderId = tr.data('order-id');

        if (highlight) tr.addClass('info');

        var modal = new bte.OrderInfoModal(orderId);
        modal.show();
    });
}

/* click on sku */
function enableSkuClick(highlight = true) {
    $('.sku a').click(function() {
        if (highlight) $('tr').removeClass('info');

        var tr = $(this).closest('tr');
        var sku = $(this).text();

        if (highlight) tr.addClass('info');

        var modal = new bte.SkuInfoModal(sku);
        modal.show();
    });
}

/* When the user clicks on the GoTop button, scroll to the top of the document */
function onPageScroll() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("btnGoTop").style.display = "block";
    } else {
        document.getElementById("btnGoTop").style.display = "none";
    }
}

function goTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function enableGoTopBtn() {
    window.onscroll = function() { onPageScroll() };
}

// Enter key press behaves like a Tab
function enableEnterToTab() {
  // disable enter to submit the form
  /*
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });

  $(document).on("keypress", "form", function(event) {
    return event.keyCode != 13;
  });*/

  // this seems is the best solution
  /*
  document.addEventListener('keydown', function (event) {
    if (event.keyCode === 13 && event.target.nodeName === 'INPUT') {
      var form = event.target.form;
      var index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  });
  */
  $('body').on('keydown', 'input, select, textarea', function(e) {
    var self = $(this),
        form = self.parents('form:eq(0)'),
        focusable,
        next;

    if (e.keyCode == 13) {
        focusable = form.find('input,a,select,button,textarea').filter(':visible:not([readonly]):enabled');
        next = focusable.eq(focusable.index(this)+1);
        if (next.length) {
            next.focus();
        } else {
            form.submit();
        }
        return false;
    }
  });
}

function ajaxCall(url, data, success, fail) {
    $.post(url, data, function(res) {
        if (res.status == 'OK') {
            success(res.data);
        } else {
            fail(res.message);
        }
    },
    'json'
    ).fail(function() {
        alert("error");
    });
}

/* Namespace bte */

var bte = { }

bte.AjaxCall = class {
    constructor(url, data) {
        this.url = url;
        this.data = data;
        this.onSuccess = function() {};
        this.onFailure = function() {};
    }

    set success(val) {
        this.onSuccess = val;
    }

    set failure(val) {
        this.onFailure = val;
    }

    exec() {
        var self = this;
        $.post(self.url, self.data, function(res) {
            if (res.status == 'OK') {
                self.onSuccess(res.data);
            } else {
                self.onFailure(res.message);
            }
          }, 'json'
        ).fail(function() {
          alert("error");
        });
    }
}

bte.OrderInfoModal = class {
    constructor(orderId) {
        this.orderId = orderId;
        this.url = '/modal/orderinfo/' + orderId;
    }

    end(index, layero) { }

    show() {
        var self = this;

        var ajaxCall = new bte.AjaxCall(self.url, { });

        ajaxCall.success = function(html) {
            //layer.config({
            //    type: 1,
            //    moveType: 1,
            //    skin: 'layui-layer-molv',
            //});
            layer.open({
                title:      false,
                area:       ['550px', 'auto'],
                shadeClose: true,
                end:        (index, layero) => { self.end(index, layero) },
                content:    html
            })
        };

        ajaxCall.failure = function(message) {
            showError(message);
        };

        ajaxCall.exec();
    }
}

bte.OrderStatusModal = class {
    constructor(orderId) {
        this.orderId = orderId;
        this.url = '/modal/orderstatus/' + orderId;
    }

    end(index, layero) { }

    show() {
        var self = this;

        var ajaxCall = new bte.AjaxCall(self.url, { });

        ajaxCall.success = function(html) {
            //layer.config({
            //    type: 1,
            //    moveType: 1,
            //    skin: 'layui-layer-molv',
            //});
            layer.open({
                type:       1,
                skin:       'layui-layer-rim',
                title:      'Order Status',
                area:       ['800px', 'auto'],
                shadeClose: true,
                end:        (index, layero) => { self.end(index, layero) },
                content:    html
            })
        };

        ajaxCall.failure = function(message) {
            showError(message);
        };

        ajaxCall.exec();
    }
}

bte.OrderNoteModal = class {
    constructor(orderId) {
        this.orderId = orderId;
        this.url = '/modal/ordernote/' + orderId;
    }

    end(index, layero) { }

    yes(index, layero) {
        layer.close(index);
    }

    show() {
        var self = this;

        var ajaxCall = new bte.AjaxCall(self.url, { });

        ajaxCall.success = function(html) {
            layer.open({
                title:      'Order Note (for ' + self.orderId + ')',
                area:       ['600px', 'auto'],
                btn:        ['OK', 'Cancel'],
                yes:        (index, layero) => { self.yes(index, layero) },
                end:        (index, layero) => { self.end(index, layero) },
                content:    html
            })
        };

        ajaxCall.failure = function(message) {
            showError(message);
        };

        ajaxCall.exec();
    }
}

bte.PriceAvailModal = class {
    constructor(sku) {
        this.sku = sku;
        this.onClose = function() { };
        this.onSelected = function(data) { };
    }

    set done(val) {
        this.onClose = val;
    }

    set selected(val) {
        this.onSelected = val;
    }

    yes(index, layero) {
        var radio = layero.find('input[type=radio]:checked');
        if (radio.length) {
            var tr = radio.closest('tr');
            var sku = tr.data('sku');
            var branch = tr.data('branch');
            var code = tr.data('branch-code');

            this.onSelected({sku: sku, branch: branch, code: code});
        }
        layer.close(index);
    }

    end(index, layero) {
    }

    success(layero, index){
        layero.find('table tr').click(function(){
            $(this).find('input[type=radio]').prop('checked', true);
        });
    }

    show() {
        var self = this;

        var ajaxCall = new bte.AjaxCall('/modal/priceavail', { sku: self.sku });

        ajaxCall.success = function(html) {
            layer.open({
                title:   'Price and Availability',
                area:    ['600px', 'auto'],
                btn:     ['OK', 'Cancel'],
                yes:     (index, layero) => { self.yes(index, layero) },
                success: (index, layero) => { self.success(index, layero) },
                end:     (index, layero) => { self.end(index, layero) },
                content: html
            })
            self.onClose();
        };

        ajaxCall.failure = function(message) {
            self.onClose();
            showError(message);
        };

        ajaxCall.exec();
    }
}

// NOT-IN-USE, NEED REFACTORING
bte.PurchaseModal = class {
    constructor(data) {
        this.data = data;
        this.onSuccess = function() {};
        this.onFailure = function() {};
        this.onClose = function() {};
    }

    set success(val) {
        this.onSuccess = val;
    }

    set failure(val) {
        this.onFailure = val;
    }

    set done(val) {
        this.onClose = val;
    }

    getShipMethods(data) {
        var shipMethod = '';

        if (data.sku.substr(0, 3) != 'SYN') {
            return shipMethod;
        }

        var loading = layer.load(1, { shade: false });

        $.ajax({
            type: 'POST',
            url: '/ajax/freight/quote',
            data: data,
            async: false,
            success: function(res) {
                layer.close(loading);
                shipMethod = `
                    <label>Ship Method</label>
                    <select id="ship-method" style="float:right;width:320px;">
                    ${res.data}
                    </select><br><br>`;
            }
        });

        return shipMethod;
    }

    getNotifyEmails(data) {
        var emails = '';

        if (data.sku.substr(0, 2) == 'TD') {
            emails = `<div style="margin-top:15px">
              <label>Email Notification</label>
              <select id="notify-email" style="float:right;width:300px;">
                <option>doris@btecanada.com</option>
              </select></div>`;
        }

        return emails;
    }

    getMaxLength(data) {
        if (data.sku.substr(0, 2) == 'DH') {
            return '58';
        }
        if (data.sku.substr(0, 3) == 'ING') {
            return '35';
        }
        if (data.sku.substr(0, 3) == 'SYN') {
            return '60';
        }
        if (data.sku.substr(0, 2) == 'TD') {
            return '52';
        }
        return '60';
    }

    getPurchaseNote(data) {
        if (data.sku.substr(0, 2) == 'DH') {
            return 'Drop ship';
        }
        return '';
    }

    yes(index, layero) {
        var comment     = layero.find('#comment').val();
        var shipMethod  = layero.find('#ship-method option:selected').val();
        var notifyEmail = layero.find('#notify-email option:selected').text();

        this.data.comment     = comment;
        this.data.shipMethod  = shipMethod;
        this.data.notifyEmail = notifyEmail;

        var ajaxCall = new bte.AjaxCall('/ajax/make/purchase', this.data);

        ajaxCall.success = this.onSuccess;
        ajaxCall.failure = this.onFailure;
        ajaxCall.exec();

        layer.close(index);
    }

    end(index, layero) {
        this.onClose();
    }

    content(data) {
        var shipMethod   = this.getShipMethods(data);
        var notifyEmails = this.getNotifyEmails(data);
        var maxLength    = this.getMaxLength(data);
        var purchaseNote = this.getPurchaseNote(data);

        return `<div style="padding: 20px;">
           <table class="table table-condensed">
             <tr><td><b>SKU: </b></td><td>${data.sku ? data.sku : '-'}</td></tr>
             <tr><td><b>Branch: </b></td><td>${data.branch ? data.branch: '-'}</td></tr>
             <tr><td><b>Qty: </b></td><td>${data.qty? data.qty: '-'}</td></tr>
           </table>
           ${shipMethod}
           <label for="comment">Purchase note</label> (Max ${maxLength} chars)<br />
           <textarea id="comment" maxlength="${maxLength}" style="width: 440px; height: 80px; resize: none;">${purchaseNote}</textarea>
           ${notifyEmails}
         </div>`;
    }

    show() {
        var self = this;
        layer.open({
            title:   'Purchase',
            area:    ['480px', 'auto'],
            btn:     ['Purchase', 'Cancel'],
            yes:     (index, layero) => { self.yes(index, layero) },
            end:     (index, layero) => { self.end(index, layero) },
            content: self.content(self.data)
        });
    }
}

bte.SkuListModal = class {
    constructor(data, searchby) {
        this.data = data;
        this.searchby = searchby;
    }

    content(skus, upc) {
        var content = '';
        var searchby = this.searchby;

        for (var i=0; i<skus.length; i++) {
          content += `<li>${skus[i]}</li>`;
        }

        return `<div style="padding: 20px; font-size: 20px;">
           SKUs for ${searchby} <label>${upc}</label><br />
           <ul>${content}</ul>
         </div>`;
    }

    show() {
        var self = this;
        var upc = self.data;

        var url = '/api/query/upc/';
        if (self.searchby == 'MPN') {
            url = '/api/query/mpn/';
        }

        ajaxCall(url + upc, { upc: upc },
            function(data) {
                layer.open({
                    title:      false,
                    area:       ['400px', 'auto'],
                    shadeClose: true,
                    end:        function(index, layero) { },
                    content:    self.content(data, upc)
                })
            },
            function(message) {
                showError(message);
            }
        );
    }
}

bte.EditInvlocNoteModal = class {
    constructor(data) {
        this.data = data;
        this.onSuccess = function() {};
        this.onFailure = function() {};
        this.onClose = function() {};
    }

    set success(val) {
        this.onSuccess = val;
    }

    set failure(val) {
        this.onFailure = val;
    }

    set done(val) {
        this.onClose = val;
    }

    content(data) {
        var note = data.note;
        var sn = data.sn;
        return `<div style="padding: 20px;">
           <div>
             <label for="sn" style="width: 3em;">SN#</label>
             <input type="text" id="sn" size="60" value="${sn}">
           </div><br>
           <label for="note">Note</label> (Max 80 chars)<br />
           <textarea id="note" maxlength="80" style="width: 440px; height: 80px; resize: none;">${note}</textarea>
         </div>`;
    }

    end(index, layero) {
    }

    yes(index, layero) {
        var self = this;

        var note = layero.find('#note').val();
        var sn = layero.find('#sn').val();

        self.data.sn = sn;
        self.data.note = note;

        ajaxCall('/inventory/update', self.data, self.onSuccess, self.onFailure);
        layer.close(index);
    }

    show() {
        var self = this;

        layer.open({
            title:   'Edit Note',
            area:    ['480px', 'auto'],
            btn:     ['Save', 'Cancel'],
            yes:     (index, layero) => { self.yes(index, layero) },
            end:     (index, layero) => { self.end(index, layero) },
            content: self.content(self.data)
        })
    }
}

bte.EditOverstockNoteModal = class {
    constructor(data) {
        this.data = data;
        this.onSuccess = function() {};
        this.onFailure = function() {};
        this.onClose = function() {};
    }

    set success(val) {
        this.onSuccess = val;
    }

    set failure(val) {
        this.onFailure = val;
    }

    set done(val) {
        this.onClose = val;
    }

    content(data) {
        var note = data.note;
        return `<div style="padding: 20px;">
           <label for="note">Note</label> (Max 200 chars)<br />
           <textarea id="note" maxlength="200" style="width: 440px; height: 100px; resize: none;">${note}</textarea>
         </div>`;
    }

    end(index, layero) {
    }

    yes(index, layero) {
        var self = this;

        var note = layero.find('#note').val();

        self.data.note = note;

        ajaxCall('/overstock/note', self.data, self.onSuccess, self.onFailure);
        layer.close(index);
    }

    show() {
        var self = this;

        layer.open({
            title:   'Edit Note',
            area:    ['480px', 'auto'],
            btn:     ['Save', 'Cancel'],
            yes:     (index, layero) => { self.yes(index, layero) },
            end:     (index, layero) => { self.end(index, layero) },
            content: self.content(self.data)
        })
    }
}

bte.SkuInfoModal = class {
    constructor(sku) {
        this.sku = sku;
        this.url = '/modal/skuinfo/' + sku;
    }

    show() {
        var self = this;

        var ajaxCall = new bte.AjaxCall(self.url, { });

        ajaxCall.success = function(html) {
            layer.open({
                type:       1,
                skin:       'layui-layer-rim',
                shadeClose: true,
                area:       ['560px', 'auto'],
                title:      'SKU Information',
                content:    html
            });
        };

        ajaxCall.failure = function(message) {
            showError(message);
        };

        ajaxCall.exec();
    }
}

bte.InputPurchaseOrderModal = class {
    constructor(info = null) {
        this.mode = info ? 'update' : 'input';
        this.url  = info ? '/purchase/update' : '/purchase/input';
        this.data = info || { orderId: '', sku: '', ponum: '', flag: '' };

        this.onSuccess = function() {};
        this.onFailure = function() {};
        this.onClose = function() {};
    }

    content(data) {
        return `<div style="padding: 20px;">
           <div>
             <label for="order_id" style="width: 6em;">Order#</label>
             <input type="text" id="order_id" size="40" value="${data.orderId}" required ${this.mode=='update' ? 'disabled' : ''}>
           </div><br>
           <div>
             <label for="sku" style="width: 6em;">SKU</label>
             <input type="text" id="sku" size="40" value="${data.sku}">
           </div><br>
           <div>
             <label for="ponum" style="width: 6em;">PO#</label>
             <input type="text" id="ponum" size="40" value="${data.ponum}">
           </div><br>
           <div>
             <input style="margin-left: 6em;" type="radio" id="dropship" name="flag" value="dropship" ${data.flag=='dropship' ? 'checked' : ''}>
             <label for="dropship">Dropship</label><br>
             <input style="margin-left: 6em;" type="radio" id="purchase" name="flag" value="shipToUs" ${data.flag!='dropship' ? 'checked' : ''}>
             <label for="purchase">Purchase</label>
           </div>
         </div>`;
    }

    end(index, layero) {
    }

    yes(index, layero) {
        var data = {};
        var self = this;

        self.data.orderId = layero.find('#order_id').val().trim();
        self.data.sku = layero.find('#sku').val().trim();
        self.data.ponum = layero.find('#ponum').val().trim();
        self.data.flag = layero.find("input[name='flag']:checked").val();

        if (self.data.orderId.length == 0) {
            return;
        }

        var ajaxCall = new bte.AjaxCall(self.url, self.data);

        ajaxCall.success = function(msg) {
            layer.tips(msg, '.layui-layer-btn0', { tips: [1, '#5FB878'] });

            if (layero.find('#dropship').is(':checked')) {
                layero.find('#sku').val('');
                layero.find('#ponum').val('');
                layero.find('#order_id').val('').focus();
            }

            if (layero.find('#purchase').is(':checked')) {
                layero.find('#sku').val('');
                layero.find('#order_id').val('').focus();
            }
        };

        ajaxCall.failure = function(message) {
            layer.tips(message, '.layui-layer-btn0', { tips: [1, '#FF4400'] });
        };

        ajaxCall.exec();

        if (self.mode == 'update') {
            self.onSuccess(self.data);
            layer.close(index);
        }
    }

    show() {
        var self = this;

        layer.open({
            title:   'Input Purchase Order',
            area:    ['400px', 'auto'],
            btn:     ['Save', 'Close'],
            yes:     (index, layero) => { self.yes(index, layero) },
            end:     (index, layero) => { self.end(index, layero) },
            content: self.content(self.data)
        })
    }
}

bte.WishlistEditModal = class {
    constructor(info = null) {
        this.mode = info ? 'update' : 'input';
        this.url  = info ? '/wishlist/update' : '/wishlist/input';
        this.data = info || { sku: '', qty: '', desc : '' };

        this.onSuccess = function() {};
        this.onFailure = function() {};
        this.onClose = function() {};
    }

    content(data) {
        return `<div style="padding: 20px;">
           <div>
             <label for="sku" style="width: 6em;">SKU</label>
             <input type="text" id="sku" size="40" value="${data.sku}">
           </div><br>
           <div>
             <label for="qty" style="width: 6em;">Qty</label>
             <input type="text" id="qty" size="40" value="${data.qty}" required>
           </div><br>
           <div>
             <label for="desc" style="width: 6em;">Description</label>
             <div></div>
           </div>
           <div>
             <textarea id="desc" style="width: 360px; height: 80px; resize: none;">${data.desc}</textarea>
           </div><br>
         </div>`;
    }

    end(index, layero) {
    }

    yes(index, layero) {
        var data = {};
        var self = this;

        self.data.sku = layero.find('#sku').val().trim();
        self.data.qty = layero.find('#qty').val().trim();
        self.data.desc = layero.find('#desc').val().trim();

        if (self.data.sku.length == 0) {
            return;
        }

        var ajaxCall = new bte.AjaxCall(self.url, self.data);

        ajaxCall.exec();
        self.onSuccess(self.data);

        layer.close(index);
    }

    show() {
        var self = this;

        layer.open({
            title:   'Edit Wishlist',
            area:    ['400px', 'auto'],
            btn:     ['Save', 'Close'],
            yes:     (index, layero) => { self.yes(index, layero) },
            end:     (index, layero) => { self.end(index, layero) },
            content: self.content(self.data)
        })
    }
}

bte.InputWrongItemModal = class {
    constructor(info = null) {
        this.url  = '/wrongitems/add';
        this.data = { };

        this.onSuccess = function() {};
        this.onFailure = function() {};
        this.onClose = function() {};
    }

    content(data) {
        return `<div style="padding: 20px;">
           <div>
             <label for="sku" style="width: 6em;">SKU</label>
             <input type="text" id="sku" size="40" value="">
           </div><br>
           <div>
             <label for="market" style="width: 6em;">Market</label>
             <select id="market" style="width: 260px;">
               <option value="All">All</option>
               <option value="Amazon">Amazon</option>
               <option value="Newegg">Newegg</option>
               <option value="eBay">eBay</option>
               <option value="Rakuten">Rakuten</option>
               <option value="Bestbuy">Bestbuy</option>
               <option value="Walmart">Walmart</option>
             </select>
           </div><br>
           <div>
             <input style="margin-left: 6em;" type="checkbox" id="oversize" value="1">
             <label for="oversize">Oversize</label><br>
             <input style="margin-left: 6em;" type="checkbox" id="overweight" value="1">
             <label for="overweight">Overweight</label>
           </div>
           <div>
             <label for="note" style="width: 6em;">Note</label>
             <textarea id="note" style="width: 360px; height: 80px; resize: none;"></textarea>
           </div>
         </div>`;
    }

    end(index, layero) {
    }

    yes(index, layero) {
        var data = {};
        var self = this;

        self.data.sku = layero.find('#sku').val().trim();
        self.data.market = layero.find('#market').val();
        self.data.oversize = layero.find('#oversize').is(':checked') ? 1 : 0;
        self.data.overweight = layero.find("#overweight").is(':checked') ? 1 : 0;
        self.data.note = layero.find("#note").val();

        if (self.data.sku.length == 0) {
            return;
        }

        var ajaxCall = new bte.AjaxCall(self.url, self.data);

        ajaxCall.success = function(msg) { };
        ajaxCall.exec();

        layer.close(index);
    }

    show() {
        var self = this;

        layer.open({
            title:   'Input Wrong Item',
            area:    ['400px', 'auto'],
            btn:     ['Save', 'Close'],
            yes:     (index, layero) => { self.yes(index, layero) },
            end:     (index, layero) => { self.end(index, layero) },
            content: self.content(self.data)
        })
    }
}

bte.BackOrderEmailModal = class {
    constructor(orderId) {
        this.orderId = orderId;
        this.url = '/modal/backordermail/' + orderId;
    }

    end(index, layero) { }

    yes(index, layero) {
        var email = layero.find('#email').val().trim();
        var subject = layero.find('#title').val();
        var content = layero.find('#content').val();

        content = encodeURIComponent(content);
        var win = window.open(`mailto:${email}?subject=${subject}&body=${content}`);
        //win.close();

        layer.close(index);
    }

    show() {
        var self = this;

        var ajaxCall = new bte.AjaxCall(self.url, { });

        ajaxCall.success = function(html) {
            layer.open({
                title:   'BackOrder Email',
                area:    ['550px', 'auto'],
                btn:     ['Send', 'Cancel'],
                yes:     (index, layero) => { self.yes(index, layero) },
                end:     (index, layero) => { self.end(index, layero) },
                content: html
            })
        };

        ajaxCall.failure = function(message) {
            showError(message);
        };

        ajaxCall.exec();
    }
}

bte.InputOrderIncidentModal = class {
    constructor(orderId = '') {
        this.url  = '/order/addincident';
        this.data = { order: orderId, category: '', detail : '' };

        this.onSuccess = function() {};
        this.onFailure = function() {};
        this.onClose = function() {};
    }

    content(data) {
        return `<div style="padding: 20px 20px 0 20px;">
           <span>
             <label style="margin-right: 5px;">Order#</label>
             <input type="text" id="order" size="30" value="${data.order}">
           </span>
           <span>
             <label style="margin-left: 5px;">Category</label>
             <select id="category" style="width:200px; padding: 4px;">
              <option></option>
              <option>Customer Service</option>
              <option>Inventory</option>
              <option>Marketing</option>
              <option>Purchasing</option>
              <option>Return</option>
              <optgroup label="Shipping">
                <option>Shipping Label</option>
                <option>Shipping Lost/Damage</option>
              </optgroup>
              <optgroup label="Vendor">
                <option>Vendor Wrong Invoice Price</option>
                <option>Vendor Shortship</option>
                <option>Vendor Delay</option>
              </optgroup>
              <optgroup label="Warehouse">
                <option>WHS Lost/Damage</option>
                <option>WHS Packing</option>
                <option>WHS Picking</option>
                <option>WHS Receiving</option>
              </optgroup>
              <option>Other</option>
            </select>
           </span>
           <br><br>
           <div>
             <label for="detail">Incident detail:</label><br>
             <textarea id="detail" style="width: 560px; height: 120px; resize: none;">${data.detail}</textarea>
           </div>
         </div>`;
    }

    end(index, layero) {
    }

    yes(index, layero) {
        var self = this;

        self.data.order = layero.find('#order').val().trim();
        self.data.category = layero.find('#category').val().trim();
        self.data.detail = layero.find('#detail').val().trim();

        if (self.data.detail.length == 0) {
            return;
        }

        var ajaxCall = new bte.AjaxCall(self.url, self.data);

        ajaxCall.exec();

        layer.close(index);
    }

    show() {
        var self = this;

        layer.open({
            title:   'Order Incident',
            area:    ['600px', 'auto'],
            btn:     ['Save', 'Close'],
            yes:     (index, layero) => { self.yes(index, layero) },
            end:     (index, layero) => { self.end(index, layero) },
            content: self.content(self.data)
        })
    }
}

bte.TableCellEditModal = class {
    constructor(url, el, oldval) {
        this.url = url;
        this.el  = el;
        this.oldval = oldval || this.el.text();
        this.title = 'Edit';
        this.label = 'New Value';
    }

    content() {
        var val = this.oldval;
        return `<div style="padding: 20px 20px 0 20px;">
             <label>${this.label}:</label><br>
             <textarea id="newval" style="width: 560px; height: 120px; resize: none;">${val}</textarea>
         </div>`;
    }

    end(index, layero) {
    }

    yes(index, layero) {
        var self = this;
        var data = { };

        var tr = self.el.closest('tr');
        var id = tr.data('id');
        var name = self.el.data('name');
        var val = layero.find('#newval').val().trim();

        data.id = id;
        data[name] = val;

        var ajaxCall = new bte.AjaxCall(self.url, data);

        ajaxCall.success = function(res) {
          if (self.onSuccess) {
            self.onSuccess(data);
          } else {
              self.el.text(val);
          }
        }

        ajaxCall.exec();

        layer.close(index);
    }

    show() {
        var self = this;

        layer.open({
            title:   self.title,
            area:    ['600px', 'auto'],
            btn:     ['Save', 'Close'],
            yes:     (index, layero) => { self.yes(index, layero) },
            end:     (index, layero) => { self.end(index, layero) },
            content: self.content()
        })
    }
}

bte.ProductListingModal = class {
    constructor(msku) {
        this.msku = msku;
    }

    end(index, layero) { }

    yes(index, layero) {
        layer.close(index);
    }

    show() {
        var self = this;

        var url = '/modal/listings/' + self.msku;
        var ajaxCall = new bte.AjaxCall(url, { });

        ajaxCall.success = function(html) {
            layer.open({
                shadeClose: true,
                title:      'Product Listings',
                area:       ['600px', '600px'],
                btn:        ['Close'],
                yes:        (index, layero) => { self.yes(index, layero) },
                end:        (index, layero) => { self.end(index, layero) },
                content:    html
            })
        };

        ajaxCall.failure = function(message) {
            showError(message);
        };

        ajaxCall.exec();
    }
}
bte.utils = { }

/**
 * RFC4122 version 4 compliant unique id creator.
 * Added by https://github.com/tufanbarisyildirim/
 * @returns {String}
 */
bte.utils.newGuid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

bte.utils.sprintf = function (str) {
    var args = arguments,
        flag = true,
        i = 1;
    str = str.replace(/%s/g, function () {
        var arg = args[i++];
        if (typeof arg === 'undefined') {
            flag = false;
            return '';
        }
        return arg;
    });
    return flag ? str : '';
}

bte.utils.showToast = function (msg, autoHide=false) {
    $.toast({
        heading: 'Success',
        text: msg,
        showHideTransition: 'fade',
        hideAfter: autoHide,
        position: { right: 30, top: 60 },
        icon: 'success'
    })
}

bte.utils.showError = function (msg) {
    $.toast({
        heading: 'Error',
        text: msg,
        showHideTransition: 'fade',
        hideAfter: 5000,
        position: { right: 30, top: 60 },
        icon: 'error'
    })
}
