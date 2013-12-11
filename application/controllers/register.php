<?php
class Register extends CI_Controller{
    public function __construct(){
        parent::__construct();
    }

    public function index(){
        $this->load->view("register");
    }

    public function registerUser(){
        if($this->input->post("email") && $this->input->post("password") && $this->input->post("nombre"))
        {
            $this->form_validation->set_rules('password', 'password', 'trim|required|xss_clean');
            $this->form_validation->set_rules('nombre', 'nombre', 'trim|required|xss_clean');
            $this->form_validation->set_rules('email', 'Email', 'trim|required|valid_email|xss_clean');
            if($this->form_validation->run() == false){
                echo json_encode(array("respuesta" => "error_form"));
            }else{
                $this->load->model("register_model");
                $email = $this->input->post("email");
                $password = $this->input->post("password");
                $nombre = $this->input->post("nombre");
                $loginUser = $this->register_model->registerUser($email,$password,$nombre);
                if($loginUser === true){
                    echo json_encode(array("respuesta" => "success"));
                }else{
                    echo json_encode(array("respuesta" => "exists"));
                }
            }
        }else{
            echo json_encode(array("respuesta" => "error_form"));
        }
    }
}