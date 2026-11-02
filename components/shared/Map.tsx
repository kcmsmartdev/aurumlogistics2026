export default function Map(){
    return(
      
             <div className="w-full h-full lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.289659118594!2d-77.10731122517514!3d-12.023568688211427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105cb00205b27b9%3A0x67af4beaf4dd362!2sCENTRO%20A%C3%89REO%20COMERCIAL!5e0!3m2!1ses-419!2spe!4v1792607722493!5m2!1ses-419!2spe"
                    className="w-full h-100 md:h-150"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Ubicación en Google Maps"
                />
            </div>
      

    )}