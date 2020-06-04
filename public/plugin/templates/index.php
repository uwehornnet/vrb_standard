<div id="vabs">
    <div class="vabs">
        <div class="vabs__card">
            <div class="vabs__card--header">
                <img src="<?php echo plugins_url('/vrb_standard/assets/img/logo.png'); ?>" alt="logo">
            </div>
            <div class="vabs__card--body">
                <form action="<?php echo plugins_url('/vrb_standard/public/plugin/controller/formcontroller.php'); ?>" class="form" method="POST">
                    <div class="form">
                        <div class="form__field">
                            <label>API TOKEN</label>
                            <input type="text" class="form__field--input" name="api_token" value="<?= $this->config['api_token'] ?>">
                        </div>
                        <div class="form__field">
                            <label>CLIENT ID</label>
                            <input type="text" class="form__field--input" name="client_id" value="<?= $this->config['client_id'] ?>">
                        </div>
                        <div class="form__field">
                            <label>URL</label>
                            <input type="text" class="form__field--input" name="url" value="<?= $this->config['url'] ?>">
                        </div>

                        <div class="form__field">
                            <label>REFERRER ID</label>
                            <input type="text" class="form__field--input" name="referrer_id" value="<?= $this->config['referrer'] ?>">
                        </div>
                        <div class="form__field">
                            <input type="submit" class="button button-primary" value="save changes" id="save_main_options">
                            <span class="loading"></span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>