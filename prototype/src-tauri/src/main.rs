// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    let mut args = std::env::args().skip(1);
    if let Some(flag) = args.next() {
        if flag == "--transcribe" {
            let path = args.next().unwrap_or_default();
            if path.is_empty() {
                eprintln!("usage: ielts-coach --transcribe <audio-file>");
                std::process::exit(2);
            }
            #[cfg(target_os = "macos")]
            {
                match app_lib::transcribe_file_cli(&path) {
                    Ok(text) => {
                        println!("{text}");
                        return;
                    }
                    Err(err) => {
                        eprintln!("{err}");
                        std::process::exit(1);
                    }
                }
            }
            #[cfg(not(target_os = "macos"))]
            {
                eprintln!("系统转写仅支持 macOS");
                std::process::exit(1);
            }
        }
    }
    app_lib::run();
}
