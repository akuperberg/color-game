<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AudioModal from './AudioModal.vue'
</script>

<template>
    <nav class="navbar navbar-expand-md custom-navbar">
        <div class="container-fluid">
            <button 
                class="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarNav" 
                aria-controls="navbarNav" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item">
                        <RouterLink to="/administration" class="nav-link custom-nav-link">Administration</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/exercise" class="nav-link custom-nav-link">Exercise</RouterLink>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link custom-nav-link" data-bs-toggle="modal" data-bs-target="#soundSettingsModal">Sound Settings</a>
                    </li>
                </ul>
            </div>

            <AudioModal />
        </div>
    </nav>
</template>

<style scoped lang="scss">
    .custom-navbar {
        background-color: transparent;
        padding: 10px 0;
        
        .navbar-toggler {
            border: none;
            padding: 4px 8px;
            
            &:focus {
                box-shadow: none;
            }
            
        }
        
        .navbar-nav {
            gap: 10px;
            
            .nav-item {
                .custom-nav-link {
                    cursor: pointer;
                    padding: 10px;
                    border-radius: 5px;
                    text-decoration: none;
                    color: #000;
                    transition: all 0.3s ease;
                    font-size: 18px;
                    display: block;
                    
                    &:hover {
                        color: #BF40BF;
                    }
                    
                    &.router-link-active {
                        color: #BF40BF;
                    }
                    
                    &.router-link-exact-active {
                        color: #BF40BF;
                    }
                }
            }
        }
        
        @media (max-width: 767.98px) {
            .navbar-nav {
                text-align: end;
                margin-top: 10px;
                
                .nav-item {
                    margin: 5px 0;
                }
            }
        }
    }
</style>