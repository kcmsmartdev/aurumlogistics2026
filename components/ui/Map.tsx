export default function Map(){
    return(
      
             <div className="w-full max-w-4xl mx-auto">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d410.1787313379901!2d-77.1051745253218!3d-12.022874701179939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2spe!4v1792518773657!5m2!1ses-419!2spe"
                    className="w-full h-100 md:h-150 border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Ubicación en Google Maps"
                />
            </div>
      
    )
}