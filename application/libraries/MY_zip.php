<?php if ( ! defined ( 'BASEPATH' )) exit( 'No direct script access allowed' );
class MY_Zip extends CI_Zip {

/**
* Read a directory and add it to the zip.
*
* This function recursively reads a folder and everything it contains (including
* sub-folders) and creates a zip based on it. Whatever directory structure
* is in the original file path will be recreated in the zip file.
*
* @access public
* @param string path to source
* @return bool
*/
	function read_dir($path, $preserve_filepath = TRUE, $root_path = NULL)
{
		if ( ! $fp = @opendir($path))
		{
			return FALSE;
		}

		// Set the original directory root for child dir's to use as relative
		if ($root_path === NULL)
		{
			$root_path = dirname($path).'/';
		}

		while (FALSE !== ($file = readdir($fp)))
		{
			if ( $file == '.' or $file == '..' )
			{
				continue;
			}

			if (@is_dir($path.$file))
			{
				$this->read_dir($path.$file."/", $preserve_filepath, $root_path);
			}
			else
			{
				if (FALSE !== ($data = file_get_contents($path.$file)))
				{
					$name = str_replace("\\", "/", $path);

					if ($preserve_filepath === FALSE)
					{
						$name = str_replace($root_path, '', $name);
					}

					$this->add_data($name.$file, $data);
				}
			}
		}

		return TRUE;
}

} 