class HeaderLayout extends HTMLElement {
    constructor() {
      super();
      const shadowRootEl = this.attachShadow({mode: 'open'});
      shadowRootEl.innerHTML = `
        <style>
            @import "/assets/css/main.css";
        </style>
        <section class="jumbotron text-center">
            <div class="container">
                <h1 class="jumbotron-heading">
                    <a href="/"><span style="color:cadetblue">[PhimNetClub]</span></a>
                </h1>
                <p class="lead text-muted">LUÔN MANG NHỮNG TUYỆT PHẨM PHIM ẢNH ĐẾN VỚI BẠN SỚM NHẤT – CHẤT LƯỢNG NHẤT.</p>
            </div>
        </section>  
      `;
    }
}
window.customElements.define('header-layout', HeaderLayout);

class FooterLayout extends HTMLElement {
    constructor() {
      super();
      const shadowRootEl = this.attachShadow({mode: 'open'});
      shadowRootEl.innerHTML = `
        <style>
            @import "/assets/css/main.css";
        </style>
        <footer class="text-muted">
            <div class="container">
                <p class="float-right"><a href="#">Lên đầu trang</a></p>
                <p>&copy;PhimNetClub 2019, Cảm ơn bạn đã đồng hành. Chúc bạn luôn vui vẻ trong cuộc sống và nhiều giây phút thư giãn!</p>
                <p>Liên hệ: <a href="mailto:phimnet.club@gmail.com">phimnet.club@gmail.com</a> | <a target="_bank" href="complaints.html">Khiếu nại bản quyền</a> | <a target="_bank" href="donate.html">Quyền góp (Donate)</a>.</p>
            </div>
        </footer> 
      `;
    }
}
window.customElements.define('footer-layout', FooterLayout);

class TopFilmLayout extends HTMLElement {
    constructor() {
      super();
      const shadowRootEl = this.attachShadow({mode: 'open'});
      shadowRootEl.innerHTML = `
        <style>
            @import "/assets/css/main.css";
        </style>
        <h3 class="mb-15 group-title">Bảng xếp hạng</h3>
        <div class="row list-items-top">
            <div class="col-md-12">
                <p class="loading">Đang lấy dữ liệu ....</p>
            </div>
        </div>
      `;
        fetchDataSheet("1NXqQKdHCIgs19Vhy8M2Aq4tuj8CKNLABJXekGdOAiL0", "1", function(data) {
            var dataFilter = data.filter(function(d) {
                return d[7] === '1';
            });
            dataFilter.sort((a,b) => (a[8] > b[8]) ? 1 : ((b[8] > a[8]) ? -1 : 0));
            makeData(dataFilter, "top", $(shadowRootEl).find('.list-items-top'));
        });

    }
}
window.customElements.define('top-film-layout', TopFilmLayout);
